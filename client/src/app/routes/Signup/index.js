import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../state/authSlice";

import "./index.scss";

const Signup = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const defaultLocalState = {
    loginId: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  const [localState, setLocalState] = useState(defaultLocalState);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const onClickSignup = async (e) => {
    try {
      e.preventDefault();

      if (localState.loginId === "" || localState.password === "" || localState.firstName === "" || localState.lastName === "") {
        window.alert("Error: do not leave any fields blank. It makes our matchmaking gremlins' jobs very hard.");
        return;
      }

      // Email verification (front-end edition)
      var emailCheck = localState.email.split("@");
      if(emailCheck.length !== 2) {
        window.alert("Error: please enter an actual email.");
        return;
      }
      if(emailCheck[1] !== "usc.edu") {
        window.alert("Error: email must be a verified usc.edu account.");
        return;
      }

      const res = await axios.post("/api/user", {
        login_id: localState.loginId,
        password: localState.password,
        first_name: localState.firstName,
        last_name: localState.lastName,
        email: localState.email
      });

      setLocalState(defaultLocalState);

      if (res.status === 200) {

        const { expires, user } = res.data.payload;
        dispatch(signin({ expires, user }));
        history.replace({
          pathname: "/profile"
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Signup">
      <div className="inner container is-fluid">
        <div className="title">Sign Up</div>
        <div className="lemons">let's do this!!</div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={localState.firstName}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={localState.lastName}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          placeholder="USC Email"
          name="email"
          value={localState.email}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Username"
          name="loginId"
          value={localState.loginId}
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={localState.password}
          onChange={handleChange}
          className="input"
        />
        <button onClick={onClickSignup} className="button">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Signup;
