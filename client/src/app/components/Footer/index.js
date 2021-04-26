import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="inner container is-fixed">
<<<<<<< HEAD
                <a className="no-deco" href="/TOS" rel="noopener noreferrer" >Terms of Service</a>
                <a className="no-deco" href="/about" rel="noopener noreferrer" >FAQ</a>
                <a className="no-deco" href="/Privacy" rel="noopener noreferrer" >Privacy Policy</a>
                </div>
               <div className="inner container is-fixed"> <p>© SeniorSCramble 2021 </p>
=======
                <React.Fragment>
                    <NavLink exact activeClassName="active" className="no-deco" to="/tos">
                        terms of service
                    </NavLink>
                    <NavLink exact activeClassName="active" className="no-deco" to="/about">
                        any questions?
                    </NavLink>
                    <NavLink exact activeClassName="active" className="no-deco" to="/privacy">
                        privacy policy
                    </NavLink>
                </React.Fragment>
                <p>© SeniorSCramble 2021 </p>
>>>>>>> 92f3182161db8e5ff1c19a2e216e2c65e435fcbb
            </div>
        </footer>
    )
}

export default Footer;
