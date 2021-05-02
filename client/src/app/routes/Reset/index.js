import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./index.scss";

const Verify = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  const defaultLocalState = {
    loginId: "",
    resetCode: "",
    newPassword: ""
  };

  const [localState, setLocalState] = useState(defaultLocalState);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const onClickSendEmail = async (e) => {
    try {
      e.preventDefault();

      if (localState.loginId === "") {
        window.alert("Error: enter login ID.");
        return;
      }

      // GET USER BY ID CALL
      const emailCall = await axios.get(`/api/user/email/${localState.loginId}`);

      if(emailCall.status !== 200) {
        window.alert(emailCall.message);
        return;
      }

      window.alert("Reset request confirmed. Check your email ;)");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  const onClickReset = async (e) => {
    try {
      e.preventDefault();

      if (localState.newPassword === "") {
        window.alert("Error: enter a new password code.");
        return;
      }

      if(isNaN(localState.resetCode)) {
        window.alert("Error: invalid reset code.");
        return;
      }

      const res = await axios.get(`/api/user/pwreset/${localState.loginId}`);
      if(res.data.resetCode != localState.resetCode) {
        window.alert("Error: invalid reset code.");
        return;
      }
      
      const res2 = await axios.put("/api/user/password", {
        login_id: localState.loginId,
        password: localState.newPassword
      });

      setLocalState(defaultLocalState);

      if (res2.status === 200) {
        from.pathname = "/signin";
        history.replace(from);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Reset">
      <div className="inner container is-fluid">
        <div className="title">RESET YOUR PASSWORD</div>
        <div className="lemons">Forgot your password in your excitement to find love??</div>
        <input
          type="text"
          placeholder="Login ID"
          name="loginId"
          value={localState.loginId}
          onChange={handleChange}
          className="input"
        />


        <NavLink exact activeClassName="active" className="no-deco" to="/forgot">
            Forgot your login id?
        </NavLink>
        <br></br><br></br>
        <button onClick={onClickSendEmail} className="button is-blue is-hollow">Get a reset code</button>
        

        <input
          type="text"
          placeholder="Reset code"
          name="resetCode"
          value={localState.resetCode}
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={localState.newPassword}
          onChange={handleChange}
          className="input"
        />
        <button onClick={onClickReset} className="button is-blue is-hollow">RESET PASSWORD</button>
      </div>
    </div>
  );
};

export default Verify;
