import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import "./index.scss";

const TOS = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  return (
    <div className="TOS">
      <div className="inner container is-fluid">
        <h2>Terms Of Service</h2>
        
      </div>
    </div>
  );
};

export default TOS;
