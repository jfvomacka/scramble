import { React, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import "./index.scss";
import uploadcare from "uploadcare-widget"
import { Widget } from "@uploadcare/react-widget"

//Import components

//Import containers

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

  //const dispatch = useDispatch();
  const onClickDelete = async (e) => {
    try {
        e.preventDefault();
        history.replace("/delete");
      } catch (error) {
        console.error(error);
      }
  }

  const handleImageUpload = (fileInfo => { 

    console.log(fileInfo);

    const photo_id = fileInfo.uuid + "/" + fileInfo.name;
    const res = axios.put("/api/user/prof", {
      login_id: auth.user.login_id,
      uuid: photo_id
    });

    window.alert("Upload succeeded! Refresh the page to see your beautiful face ;)");
  })


  return (
    <div className="Profile">
      <div className="inner container is-fixed">
        <div className="title">PROFILE</div>
        <div className="lemons">
          Hey there, sexy ;)
        </div>

        <div className="profile-pic-div">
        <img src={"https://ucarecdn.com/" + profile.photo_id} alt="" />

        <Widget type="hidden"
            id="profile-pic-upload"
            publicKey="f5699efd930d5eda3c90"
            role="uploadcare-uploader"
            tabs="file camera"
            crop=""
            clearable
            onChange={info => handleImageUpload(info)}
          />
          
        </div>

        <div className="name"><b>{`${profile.first_name == null ? "" : profile.first_name.toUpperCase()} ${profile.last_name == null ? "" : profile.last_name.toUpperCase()}`}</b></div>

        <h2>SCHOOL: {`${profile.school == null ? "" : profile.school}`}</h2>
        <h2>MAJOR: {`${profile.major == null ? "" : profile.major}`}</h2>
        <h2>CONTACT INFO: {`${profile.contact_info == null ? "" : profile.contact_info}`}</h2>
        
        <button onClick={onClick} className="button is-blue is-hollow">Edit Information</button>
        <br></br>
        
        <button onClick={onClickDelete} className="button is-blue is-hollow">Delete Account</button>
        <div className="nerd"> <b>(LMAO NERD)</b></div>
      </div>
    </div>
  );
};

export default Profile;