import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.scss";

//Import components

//Import containers

const Dashboard = () => {
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
    <div className="Dashboard">
      <div className="inner container is-fluid">
        <h2 className="title has-text-centered">Matches</h2>
        <p className="subtitle has-text-centered">
          Here are your matches! 
        </p>
        {matchResults.map((profile) => (
          <>
          <div>{(profile.user1 === auth.user.login_id) ? profile.user2 : profile.user1} </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
