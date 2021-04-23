import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../state/authSlice";

import "./index.scss";

const Signup = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const defaultLocalState = {
    loginId: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  const onClickDelete = async (e) => {
    try {
        e.preventDefault();
  
        // Send delete request
        const deleteRequest = await axios.post("/api/user/delete", {
          login_id: auth.user.login_id
        });

        // Sign out
        const res = await axios.delete("/auth/local");
  
        if (res.status === 200 && deleteRequest.status === 200) {
          dispatch(signout());
          history.replace("/");
        }
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div className="Signup">
      <div className="inner container is-fluid">
        <h2>Are you sure you want to delete?????</h2>
        
        <button onClick={onClickDelete} className="button">
          Yes, I'm Lame
        </button>
      </div>
    </div>
  );
};

export default Signup;
