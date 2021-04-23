import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../state/authSlice";

import "./index.scss";

const Profile = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  let verification = await axios.post("/api/user/verified", {
    login_id: localState.loginId
  });

  console.log(verification);

  const dispatch = useDispatch();

  const defaultLocalState = {
    loginId: "",
    password: "",
  };

  const [localState, setLocalState] = useState(defaultLocalState);

  const auth = useSelector((state) => state.auth);

  const [matchResults, setMatchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("this got called");
      const res = await axios.get(`/api/user/match/${auth.user.login_id}`);
      setMatchResults(res.data.matches.rows);
    }
    fetchData();
  }, [auth]);

  return (
    <div className="Signin">
      <div className="inner container is-fluid">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Login Id"
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
        <button onClick={onClickSignin} className="button is-blue is-hollow">Sign In</button>
      </div>
    </div>
  );
};

export default Profile;
