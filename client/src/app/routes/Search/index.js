import React from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useState } from "react";

import "./index.scss";

//Import components

//Import containers

const Search = () => {
  const auth = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("Name");

  const grabSearchResults = async () => {
    let res;
    // do the backend request for search results

    if (searchType === "Name") {

      var terms = searchTerm.split(" ");
      res = await axios.get(`/api/user/searchName/${terms[0]}/${terms[1]}`);
      
    }
    //else if (searchType === "School") {
      //res = await axios.get(`/api/user/searchSchool/${searchTerm}`);
    //}
    else if (searchType === "Major") {
      res = await axios.get(`/api/user/searchMajor/${searchTerm}`);
    }

    // set state
    setSearchResults(res.data.results.rows);

    console.log(res.data.results.rows);
  };

  const createMatch = async (profile) => {
    // do backend request
    const res = await axios.post("/api/user/match", {
      login_id_FROM: auth.user.login_id,
      login_id_TO: profile,
    });
    if (res.status !== 200) {
      console.log("match error");
    }

    window.alert(res.data.message);
  };

  return (
    <div className="Search">
      <div className="inner container is-fixed">
        <div className="title has-text-centered">SEARCH</div>
        <p>Search for users by name or by major (searching by school is coming soon). Senior Scramble is
          anonymous unless the match is mutual, so your crushes won’t know you sent them a match unless they send you one back ;)</p>
        <input
          type="text"
          placeholder="Search for potential matches!"
          name="searchId"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <div className="find">
          <div className="lemons">Search by:</div>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="Name">Name</option>
          <option value="Major">Major</option>
        </select>
        </div>
        <div className="buttons">
          <button className="button is-red is-hollow" onClick={grabSearchResults}>SEARCH</button>
        </div>
        {searchResults.map((profile) => (
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
                {profile.major}</h2>

                <button className="button is-red is-hollow" onClick={() => createMatch(profile.login_id)}>Send Match</button>

              </div>
            </div>
          </div>
            
          </>
        ))}
      </div>
    </div>
  );
};

export default Search;

/*
*/