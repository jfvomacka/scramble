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
    <div className="grid-container">
      <div className="item1">
      <img src="https://i.imgur.com/0UajJiM.png"/>
      </div>
      <div className="item2">
    <div className="title"><img src="https://i.imgur.com/RBQJrIN.png" alt="senior scramble" title="senior scramble"/>
        </div>
        <div className="lemon">
          <i>let's get cookin'</i></div>
        <p className="heart"><img src="https://i.imgur.com/xWdyKEU.png"/></p>
       </div>
        <div className="item3">
        <img src="https://i.imgur.com/Txvfn5h.png"/>
        </div>
        <div className="item4"></div>
        <div className="item5"></div>

        <div className="item6">
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
        )}  </div>
        <div className="item7"></div>
<div className="item8"></div>
        </div> 
        </div>
  );
};
export default Landing;
