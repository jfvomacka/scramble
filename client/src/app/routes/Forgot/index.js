import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

import "./index.scss";

const Forgot = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  const defaultLocalState = {
    email: ""
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
      const emailCall = await axios.get(`/api/user/recoverID/${localState.email}`);

      if(emailCall.status !== 200) {
        window.alert(emailCall.message);
        return;
      }

      window.alert("Request confirmed. Check your email ;)");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Forgot">
      <div className="inner container is-fluid">
        <div className="title">RECOVER YOUR LOGIN ID</div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={localState.email}
          onChange={handleChange}
          className="input"
        />
        <button onClick={onClickSendEmail} className="button is-blue is-hollow">Recover your Login ID</button>
      </div>
    </div>
  );
};

export default Forgot;
