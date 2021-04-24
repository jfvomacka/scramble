import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

//Import components

//Import containers

const Landing = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="Landing">

      <div className="inner container is-fluid">
        <h1 className="title"></h1>
        <p className="lemon">
          let's get cookin'
        </p>
        {auth.isAuthenticated ? (
          <div className="buttons">
            <Link to="/profile">
              <button className="button is-large">
                Edit Profile
              </button>
            </Link>
          </div>
        ) : (
          <div className="buttons">
            <Link to="/signin">
              <button className="button  is-large">
                SIGN IN
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
