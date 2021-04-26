import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

import "./index.scss";

const Verify = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  const auth = useSelector((state) => state.auth);

  const defaultLocalState = {
    loginId: "",
    verification: "",
  };

  const [localState, setLocalState] = useState(defaultLocalState);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const onClickSignin = async (e) => {
    try {
      e.preventDefault();

      if (localState.verification === "") {
        window.alert("Error: enter verification code.");
        return;
      }

      if(isNaN(localState.verification)) {
        window.alert("Error: invalid verification code.");
        return;
      }

      const res = await axios.post("/api/user/verified", {
        login_id: auth.user.login_id,
        verification: localState.verification,
      });

      setLocalState(defaultLocalState);

      if (res.status === 200) {
        from.pathname = "/profile";
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
    <div className="Signin">
      <div className="inner container is-fluid">
        <div className="title">VERIFY YOUR ACCOUNT</div>
        <div className="lemons">Check your email ;)</div>
        <input
          type="text"
          placeholder="Verification code"
          name="verification"
          value={localState.verification}
          onChange={handleChange}
          className="input"
        />
        <button onClick={onClickSignin} className="button is-blue is-hollow">VERIFY</button>
      </div>
    </div>
  );
};

export default Verify;
