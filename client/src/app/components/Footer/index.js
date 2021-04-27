import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="Footer">

           
      

            <div className="inner container is-fixed">
                <React.Fragment>
                    <NavLink exact activeClassName="active" className="no-deco" to="/tos">
                        terms of service
                    </NavLink>
                    <NavLink exact activeClassName="active" className="no-deco" to="/about">
                        FAQ
                    </NavLink>
                    <NavLink exact activeClassName="active" className="no-deco" to="/privacy">
                        privacy policy
                    </NavLink>
                </React.Fragment>
                
            </div>
            <div className="inner container is-fixed">
                <p>© SeniorSCramble 2021 </p>
            </div>
            
        </footer>
    )
}

export default Footer;
