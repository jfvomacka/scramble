import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.scss";

//Import components

//Import containers
import SignoutButton from "../../containers/SignoutButton";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  const [matchResults, setMatchResults] = useState([]);

  useEffect(async () => {
    console.log("this got called");
    const res = await axios.get("/api/match", {
      login_id_FROM: auth.id,
    });
    setMatchResults(res.matches);
  });

  return (
    <div className="Dashboard">
      <div className="inner container is-fluid">
        <h2 className="title has-text-centered">Matches</h2>
        <p className="subtitle has-text-centered">
          Here are your matches! 
        </p>
        {matchResults.map((profile) => {
          <>
          <div>{profile.firstName} {profile.LastName}</div>
          <div>{profile.major}</div>
          <div>{profile.school}</div>
          <div>{profile.contact_info}</div>
          </>
        })}
      </div>
    </div>
  );
};

export default Dashboard;
