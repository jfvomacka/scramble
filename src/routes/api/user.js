const express = require("express"),
 router = express.Router(),
 bcrypt = require("bcryptjs"),
 jwt = require("jsonwebtoken"),
 mw = require("../../middleware")
 const nodemailer = require("nodemailer");

//@route    POST api/user
//@desc     Create a new user
//@access   public
router.post("/", async (req, res) => {
  try {
    const { login_id, password, first_name, last_name, email } = req.body;

    //Check and notify if user already exists
    const existingUser = await mw.db.getUserByLoginId(login_id);

    if (existingUser) {
      return res.status(409).json({
        message: "Login id already in use",
      });
    }

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    // Get new 8-digit verification code (between 10000000 and 99999999)
    const verification = Math.floor(Math.random() * Math.pow(10, 8)) + Math.pow(10, 7);

    //Insert new user to the table and store the newUser in a variable
    const newUser = await mw.db.addNewUser(login_id, hashed_password, first_name, last_name, email, verification);

    // Send verification email
    const mail = function(recipient, subject, message) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: recipient,
        subject,
        text: message,
      };

      transporter.sendMail(mailOptions), (error, info) => {
        if(error) {
          console.log(error);
          return error;
        }
        //console.log(`Email sent: $(info.response}`);
        return 200;
      };
    };

    const subject = "Senior SCramble Verification Code";
    const recipient = newUser.email;
    const message = "Your Senior SCramble verification code is: " + newUser.verification;
    mail(recipient, subject, message);

    //Prepare user info to be sent to client and for access token
    const authenticated_user = {
      id: newUser.id,
      login_id: newUser.login_id,
      name: newUser.name,
      school: newUser.school,
      major: newUser.major
    };

    //Create and set access token via cookie
    let token = jwt.sign(
      {
        user: authenticated_user,
      },
      process.env.AUTH_TOKEN_SECRET
    );
    let expiryTime = new Date(+process.env.AUTH_EXPIRES_IN_SECONDS * 1000 + Date.now());
    res.cookie("t", token, {
      expires: expiryTime,
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Registered & logged in",
      payload: {
        expires: expiryTime,
        user: authenticated_user,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    POST api/user/delete
//@desc     Delete a user
//@access   public
router.post("/delete", async (req, res) => {
  try {
    const { login_id } = req.body;

    //Check and notify if user already exists
    const existingUser = await mw.db.getUserByLoginId(login_id);

    if (!existingUser) {
      return res.status(409).json({
        message: "Target user does not exist! This should not have happened. If you managed to make this happen, consider us impressed.",
      });
    }

    const deletedUser = await mw.db.deleteUser(login_id);

    //console.log(deletedUser);

    return res.status(200).json({
      message: "Deleted & logged out",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    PUT api/user/update
//@desc     Update a user's information (school, major, contact info)
//@access   private
router.put("/update", async (req,res) => {
  try {
    const { login_id, school, major, contact_info } = req.body;

    //Check and notify if target user exists
    const existingUser = await mw.db.getUserByLoginId(login_id);

    if (!existingUser) {
      return res.status(409).json({
        message: "Target user does not exist! This should not have happened. If you managed to make this happen, consider us impressed.",
      });
    }

    //console.log(school);

    //Handle update
    const updateResult = await mw.db.editUserInformation(login_id, school, major, contact_info);

    return res.status(200).json({
      message: "Information successfully updated",
      updatedInfo: updateResult
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    PUT api/user/prof
//@desc     Update a user's  profile picture with a BLOB
//@access   private
router.put("/prof", async (req,res) => {
  try {
    const { login_id, image } = req.body;

    //Check and notify if target user exists
    const existingUser = await mw.db.getUserByLoginId(login_id);

    if (!existingUser) {
      return res.status(409).json({
        message: "Target user does not exist! This should not have happened. If you managed to make this happen, consider us impressed.",
      });
    }

    //console.log(image);

    //Handle update
    const updateResult = await mw.db.updateUserProfilePicture(login_id, image);

    return res.status(200).json({
      message: "Information successfully updated",
      updatedInfo: updateResult
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/me
//@desc     Get the details of an existing user
//@access   private
router.get("/me", [mw.auth.authenticate], async (req,res) => {
  try {
    res.status(200).json({
      message: "Success",
      payload: req.user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/profile
//@desc     Get the entire profile of an existing user
//@access   private
router.get("/profile/:login_id", async (req,res) => {
  try {
    const login_id = req.params.login_id;

    //Handle match request
    const user = await mw.db.getUserProfile(login_id);

    return res.status(200).json({
      message: "User profile retrieved",
      profile: user
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/verify
//@desc     Check whether a user has been verified
//@access   private
router.get("/verify/:login_id", async (req,res) => {
  try {
    const login_id = req.params.login_id;

    //Handle match request
    const verificationRequest = await mw.db.getUserByLoginId(login_id);

    return res.status(200).json({
      message: "Verification status retrieved",
      verification: verificationRequest.verified
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    PUT api/user/verified
//@desc     Verify a user
//@access   private
router.post("/verified", async (req,res) => {
  try {
    const { login_id, verification } = req.body;

    //Check and notify if target user exists
    const existingUser = await mw.db.getUserByLoginId(login_id);

    if (!existingUser) {
      return res.status(409).json({
        message: "Target user does not exist! This should not have happened. If you managed to make this happen, consider us impressed.",
      });
    }

    //Handle verification request
    const userVerification = await mw.db.verifyUser(login_id, verification);

    if(userVerification.rowCount > 0) {
      return res.status(200).json({
        message: "User successfully verified",
        updatedInfo: userVerification
      });
    }
    else {
      return res.status(409).json({
        message: "Incorrect Verification Code",
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    PUT api/user/match
//@desc     Create an outgoing one-way match request
//@access   private
router.post("/match", async (req,res) => {
  try {
    const { login_id_FROM, login_id_TO } = req.body;

    //Check and notify if target user exists
    const existingUser = await mw.db.getUserByLoginId(login_id_TO);

    if (!existingUser) {
      return res.status(409).json({
        message: "Target user does not exist!",
      });
    }

    //Handle match request
    const newMatchResult = await mw.db.handleMatchRequest(login_id_FROM, login_id_TO);

    // Thinking these can return true for sucessful match, false for one-way?
    if(newMatchResult) {
      return res.status(200).json({
        message: "New match created!",
      });
    }
    else {
      return res.status(200).json({
        message: "Awaiting completion of match.",
      });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/match
//@desc     Get a list of the user's confirmed matches
//@access   private
router.get("/match/:login_id", async (req,res) => {
  try {
    const login_id = req.params.login_id;

    //Handle match request
    const newMatchResult = await mw.db.getMatches(login_id);

    return res.status(200).json({
      message: "Matches returned",
      matches: newMatchResult
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/searchName
//@desc     Search for users by name
//@access   private
router.get("/searchName/:searchTerm", async (req,res) => {
  try {
    const name = req.params.searchTerm;

    //Handle match request
    const newSearchResult = await mw.db.searchByName(name);

    return res.status(200).json({
      message: "Results returned",
      results: newSearchResult
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/searchSchool
//@desc     Search for users by school
//@access   private
router.get("/searchSchool/:searchTerm", async (req,res) => {
  try {
    const school = req.params.searchTerm;

    //Handle match request
    const newSearchResult = await mw.db.searchBySchool(school);

    return res.status(200).json({
      message: "Matches returned",
      results: newSearchResult
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    GET api/user/searchMajor
//@desc     Search for users by major
//@access   private
router.get("/searchMajor/:searchTerm", async (req,res) => {
  try {
    const major = req.params.searchTerm;

    //Handle match request
    const newSearchResult = await mw.db.searchByMajor(major);

    return res.status(200).json({
      message: "Matches returned",
      results: newSearchResult
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      payload: error,
    });
  }
});

//@route    PUT api/user/:id
//@desc     Update the details of an existing user
//@access   private

//@route    DELETE api/user/:id
//@desc     Delete an existing user
//@access   private

//Export router
module.exports = router;
