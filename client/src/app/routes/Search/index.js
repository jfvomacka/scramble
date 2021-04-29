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
      res = await axios.get(`/api/user/searchName/${searchTerm}`);
    }
    else if (searchType === "School") {
      res = await axios.get(`/api/user/searchSchool/${searchTerm}`);
    }
    else if (searchType === "Major") {
      res = await axios.get(`/api/user/searchMajor/${searchTerm}`);
    }

    // set state
    setSearchResults(res.data.results.rows);
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
  };

  return (
    <div className="Search">
      <div className="inner container is-fixed">
        <h2 className="title has-text-centered">Search</h2>
        <input
          type="text"
          placeholder="Search for potential matches!"
          name="searchId"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <div className="buttons">
          <button className="button is-red is-hollow" onClick={grabSearchResults}>Search</button>
        </div>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="Name">Name</option>
          <option value="Major">Major</option>
          <option value="School">School</option>
        </select>
        {searchResults.map((profile) => (
          <>
          <div>{profile.first_name} {profile.last_name}</div>
          <div>{profile.major} </div>
          <div>{profile.school} </div>
          <button className="button is-red is-hollow" onClick={() => createMatch(profile.login_id)}>Request</button>
          </>
        ))}
      </div>
    </div>
  );
};

export default Search;

/*
*/