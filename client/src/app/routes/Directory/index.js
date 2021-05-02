import React from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useState } from "react";

import "./index.scss";

//Import components

//Import containers

const Directory = () => {
  const auth = useSelector((state) => state.auth);

  //const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("Name");

  const grabSearchResults = async () => {
    let res;
    // do the backend request for search results
    res = await axios.get(`/api/user/windowShopping/${searchType}`);

    // set state
    setSearchResults(res.data.results.rows);
  };

  const createMatch = async (term) => {
    // do backend request
    const res = await axios.get(`/api/user/searchName/${term}`);
    if (res.status !== 200) {
      console.log("Oopsie Woopsie! Uwu we made a fucky wucky!");
    }

    window.alert(res.data.message);
  };

  return (
    <div className="Search">
      <div className="inner container is-fixed">
        <div className="title has-text-centered">SEARCH</div>
        <p>Senior Scramble's official Code Monkey apologizes for the problems with searching. To make up for it, here's a directory
          of all the users on the site, sortable by name, major, and school. As always, Senior Scramble is
          anonymous unless the match is mutual, so your crushes won’t know you sent them a match unless they send you one back ;)</p>
        
        <div className="find">
          <div className="lemons">Sort by:</div>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="first_name">Name</option>
          <option value="major">Major</option>
          <option value="school">School</option>
        </select>
        </div>
        <div className="buttons">
          <button className="button is-red is-hollow" onClick={grabSearchResults}>SCRAMBLE!</button>
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