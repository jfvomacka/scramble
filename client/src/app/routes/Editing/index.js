import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

import "./index.scss";

const Editing = () => {
  
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  const auth = useSelector((state) => state.auth);

  const defaultLocalState = {
    login_id: "",
    major: "",
    contact: "",
    school: ""
  };

  const [localState, setLocalState] = useState(defaultLocalState);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const onClickSave = async (e) => {
    try {
      e.preventDefault();

      console.log(localState.school);

      const res = await axios.post("/api/user/update", {
        login_id: auth.user.login_id,
        school: localState.school,
        major: localState.major,
        contact_info: localState.contact
      });

      //setLocalState(defaultLocalState);
      console.log(auth.user);

      if (res.status === 200) {
        history.replace(from);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Editing">
      <div className="inner container is-fluid">
        <h2>Edit Profile</h2>
        <label for="schools">SCHOOL:</label>
        <select name="schools" id="schools" onChange={handleChange}>
          <option value="dornsife">Dornsife College of Letters, Arts and Sciences</option>
          <option value="leventhal">Leventhal School of Accounting</option>
          <option value="architecture">School of Architecture</option>
          <option value="roski">Roski School of Art and Design</option>
          <option value="iovine">Iovine and Young Academy</option>
          <option value="marshall">Marshall School of Business</option>
          <option value="sca"> School of Cinematic Arts</option>
          <option value="annenberg">Annenberg School for Communication and Journalism</option>
          <option value="kaufman">Glorya Kaufman School of Dance</option>
          <option value="dentistry">Herman Ostrow School of Dentistry</option>
          <option value="sda">School of Dramatic Arts</option>
          <option value="education">Rossier School of Education</option>
          <option value="viterbi">Viterbi School of Engineering</option>
          <option value="gerontology">Leonard Davis School of Gerontology</option>
          <option value="law">Gould School of Law</option>
          <option value="keck">Keck School of Medicine</option>
          <option value="music">Thornton School of Music</option>
          <option value="occupational">T.H. Chan Division of Occupational Science and Occupational Therapy</option>
          <option value="pharmacy">School of Pharmacy</option>
          <option value="physicaltherapy">Division of Biokinesiology and Physical Therapy</option>
          <option value="bovard">Bovard College</option>
          <option value="pp">Sol Price School of Public Policy</option>
          <option value="socialwork">Suzanne Dworak-Peck School of Social Work</option>
        </select>

        <input
          type="text"
          placeholder="Major"
          name="major"
          value={localState.major}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          placeholder="Contact"
          name="contact"
          value={localState.contact}
          onChange={handleChange}
          className="input"
        />
        <button onClick={onClickSave} className="button is-blue is-hollow">Save Changes</button>
      </div>
    </div>
  );
};

export default Editing;
