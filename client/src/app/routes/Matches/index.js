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
        <div className="title has-text-centered">MATCHES</div>
        <div className="lemons">
          What's cookin', good lookin'?
        </div>
        {matchResults.map((profile) => (
          <>
          <div className="Something">
            <div className="grid-container2">
              <div class="item1">

                <img src={`https://ucarecdn.com/${profile.photo_id}`} />

              </div>

              <div className="item2">

                <div className="name"> <b>{profile.first_name.toUpperCase()} {profile.last_name.toUpperCase()}</b></div>
                <h2>{profile.school}
                <br></br>
                {profile.major}
                <br></br>
                {profile.contact}</h2>

              </div>
            </div>
          </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Matches;