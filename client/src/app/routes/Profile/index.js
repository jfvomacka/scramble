import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "./index.scss";

//Import components

//Import containers
import SignoutButton from "../../containers/SignoutButton";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const [profile, setProfile] = useState([]);

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {

      const res_verification = await axios.get(`/api/user/verify/${auth.user.login_id}`);

      if(res_verification.data.verification) {
        history.replace("/profile");
      }
      else {
        history.replace("/verify");
      }

      const res = await axios.get(`/api/user/profile/${auth.user.login_id}`);
      setProfile(res.data.profile);
    }
    fetchData();
  }, [auth]);

  const onClick = async (e) => {
    try {
      e.preventDefault();
      history.replace("/editing");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        window.alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="Private">
      <div className="inner container is-fixed">
        <h2 className="title has-text-centered">PROFILE</h2>
        <p className="subtitle has-text-centered">
          Hey there, sexy ;)
        </p>
        <p className="is-md has-text-centered">{`${profile.first_name} ${profile.last_name}`}</p>
        <p className="is-md has-text-centered-school">SCHOOL: {`${profile.school}`}</p>
        <p className="is-md has-text-centered-school">MAJOR: {`${profile.major}`}</p>
        <p className="is-md has-text-centered-school">CONTACT INFO: {`${profile.contact_info}`}</p>

        <div className="buttons">
          <SignoutButton className="button is-red is-hollow" />
        </div>
        <button onClick={onClick} className="button is-blue is-hollow">Edit</button>
      </div>
    </div>
  );
};

export default Profile;