import React from "react";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="inner container is-fixed">
                <a className="no-deco" href="/TOS" rel="noopener noreferrer" >Terms of Service</a>
                <a className="no-deco" href="/about" rel="noopener noreferrer" >FAQ</a>
                <a className="no-deco" href="/Privacy" rel="noopener noreferrer" >Privacy Policy</a>
                </div>
               <div className="inner container is-fixed"> <p>© SeniorSCramble 2021 </p>
            </div>
        </footer>
    )
}

export default Footer;
