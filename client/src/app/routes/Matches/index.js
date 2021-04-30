import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.scss";

//Import components

//Import containers

const Matches = () => {
  const auth = useSelector((state) => state.auth);

  const [matchResults, setMatchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/user/match/${auth.user.login_id}`);
      setMatchResults(res.data.matches);
      console.log(res.data.matches);
    }
    fetchData();
  }, [auth]);

  return (
    <div className="Matches">
      <div className="inner container is-fluid">
        <h2 className="title has-text-centered">Matches</h2>
        <p className="subtitle has-text-centered">
          Here are your matches! 
        </p>
        {matchResults.map((profile) => (
          <>
          <img src={`https://ucarecdn.com/${profile.photo_id}`} width="30" height="300"/>
          <div>NAME: {profile.first_name} {profile.last_name}</div>
          <div>SCHOOL: {profile.school} </div>
          <div>MAJOR: {profile.major} </div>
          <div>CONTACT INFO: {profile.contact} </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Matches;