import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../state/authSlice";

import "./index.scss";

//Import components

//Import containers
import SignoutButton from "../../containers/SignoutButton";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  const dispatch = useDispatch();

  const onClickSignin = async (e) => {
    try {
      e.preventDefault();

      //const { expires, user } = res.data.payload;
      //dispatch(signin({ expires, user }));
      history.replace("/editing");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Private">
      <div className="inner container is-fixed">
        <h2 className="title has-text-centered">Another Private Page</h2>
        <p className="is-md has-text-centered">{`Welcome, ${auth.user.first_name} ${auth.user.last_name}`}</p>
        <p className="subtitle has-text-centered">
          This is Another Private Page. This is a private route and only
          displayed if user is logged in.
        </p>
        <div className="buttons">
          <SignoutButton className="button is-red is-hollow" />
        </div>
        <button onClick={onClickSignin} className="button is-blue is-hollow">Edit</button>
      </div>
    </div>
  );
};

export default Profile;