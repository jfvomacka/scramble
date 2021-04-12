const express = require("express"),
 router = express.Router(),
 bcrypt = require("bcryptjs"),
 jwt = require("jsonwebtoken"),
 mw = require("../../middleware")

//@route    POST api/user
//@desc     Create a new user
//@access   public
router.post("/", async (req, res) => {
  try {
    const { login_id, name, school, major, password } = req.body;

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

    //Insert new user to the table and store the newUser in a variable
    const newUser = await mw.db.addNewUser(login_id, hashed_password, name, school, major);

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

    // THIS IS NOT COMPLETE
    // Thinking these can return true for sucessful match, false for one-way?
    if(newMatchResult) {
      return res.status(200).json({
        message: "New match created!",
        payload: {
          expires: expiryTime,
          user: authenticated_user,
        },
      });
    }
    else {
      return res.status(200).json({
        message: "Awaiting completion of match.",
        payload: {
          expires: expiryTime,
          user: authenticated_user,
        },
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
router.get("/match", async (req,res) => {
  try {
    const { login_id_FROM, login_id_TO } = req.body;

    //Handle match request
    const newMatchResult = await mw.db.getMatches(login_id_FROM);

    return res.status(200).json({
      message: "Matches returned",
      payload: {
        expires: expiryTime,
        user: authenticated_user,
      },
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
    const { name } = req.params;

    //Handle match request
    const newSearchResult = await mw.db.searchByName(name);

    return res.status(200).json({
      message: "Results returned",
      payload: {
        expires: expiryTime,
        user: authenticated_user,
      },
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
    const { school } = req.params;

    //Handle match request
    const newSearchResult = await mw.db.searchBySchool(school);

    return res.status(200).json({
      message: "Matches returned",
      payload: {
        expires: expiryTime,
        user: authenticated_user,
      },
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

//@route    GET api/user/searchMajor
//@desc     Search for users by major
//@access   private
router.get("/searchMajor/:searchTerm", async (req,res) => {
  try {
    const { major } = req.params;

    console.log(major);

    //Handle match request
    const newSearchResult = await mw.db.searchByMajor(major);

    return res.status(200).json({
      message: "Matches returned",
      payload: {
        expires: expiryTime,
        user: authenticated_user,
      },
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

//@route    PUT api/user/:id
//@desc     Update the details of an existing user
//@access   private

//@route    DELETE api/user/:id
//@desc     Delete an existing user
//@access   private

//Export router
module.exports = router;
