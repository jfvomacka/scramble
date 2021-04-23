import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchData() {

      const res_verification = await axios.get(`/api/user/verify/${auth.user.login_id}`);

      if(!res_verification.data.verification) {
        history.replace("/verify");
      }
    }
    fetchData();
  }, [auth]);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const onClickSave = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.put("/api/user/update", {
        login_id: auth.user.login_id,
        school: localState.school,
        major: localState.major,
        contact_info: localState.contact
      });

      //setLocalState(defaultLocalState);

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

        <input type="file"></input>

        <label form="schools">SCHOOL:</label>
        <select name="school" id="school" onChange={handleChange}>
          <option value="Dornsife College of Letters, Arts and Sciences">Dornsife College of Letters, Arts and Sciences</option>
          <option value="Leventhal School of Accounting">Leventhal School of Accounting</option>
          <option value="School of Architecture">School of Architecture</option>
          <option value="Roski School of Art and Design">Roski School of Art and Design</option>
          <option value="Iovine and Young Academy">Iovine and Young Academy</option>
          <option value="Marshall School of Business">Marshall School of Business</option>
          <option value="School of Cinematic Arts"> School of Cinematic Arts</option>
          <option value="Annenberg School for Communication and Journalism">Annenberg School for Communication and Journalism</option>
          <option value="Glorya Kaufman School of Dance">Glorya Kaufman School of Dance</option>
          <option value="Herman Ostrow School of Dentistry">Herman Ostrow School of Dentistry</option>
          <option value="School of Dramatic Arts">School of Dramatic Arts</option>
          <option value="Rossier School of Education">Rossier School of Education</option>
          <option value="Viterbi School of Engineering">Viterbi School of Engineering</option>
          <option value="Leonard Davis School of Gerontology">Leonard Davis School of Gerontology</option>
          <option value="Gould School of Law">Gould School of Law</option>
          <option value="Keck School of Medicine">Keck School of Medicine</option>
          <option value="Thornton School of Music">Thornton School of Music</option>
          <option value="T.H. Chan Division of Occupational Science and Occupational Therapy">T.H. Chan Division of Occupational Science and Occupational Therapy</option>
          <option value="School of Pharmacy">School of Pharmacy</option>
          <option value="Division of Biokinesiology and Physical Therapy">Division of Biokinesiology and Physical Therapy</option>
          <option value="Bovard College">Bovard College</option>
          <option value="Sol Price School of Public Policy">Sol Price School of Public Policy</option>
          <option value="Suzanne Dworak-Peck School of Social Work">Suzanne Dworak-Peck School of Social Work</option>
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
