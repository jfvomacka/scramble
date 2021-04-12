import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.scss";

//Import components

//Import containers
import SignoutButton from "../../containers/SignoutButton";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {

  });

  return (
    <div className="Dashboard">
      <div className="inner container is-fluid">
        <h2 className="title has-text-centered">Matches</h2>
        <p className="is-md has-text-centered">{`Welcome, ${auth.user.first_name} ${auth.user.last_name}`}</p>
        <p className="subtitle has-text-centered">
          Here are your matches! 
        </p>
        <div className="buttons">
          <SignoutButton className="button is-red is-hollow" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
