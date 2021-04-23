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
      console.log("this got called");
      const res = await axios.get(`/api/user/profile/${auth.user.login_id}`);
      console.log("USER");
      console.log(res);
      setProfile(res.data.profile);
    }
    fetchData();
  }, [auth]);

  const onClick = async (e) => {
    try {
      e.preventDefault();

      //const { expires, user } = res.data.payload;
      //dispatch(signin({ expires, user }));
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
        <p className="is-md has-text-centered-school">{`${profile.school}`}</p>
        <p className="is-md has-text-centered-school">{`${profile.major}`}</p>
        <p className="is-md has-text-centered-school">{`${profile.contact_info}`}</p>

        <div className="buttons">
          <SignoutButton className="button is-red is-hollow" />
        </div>
        <button onClick={onClick} className="button is-blue is-hollow">Edit</button>
      </div>
    </div>
  );
};

export default Profile;