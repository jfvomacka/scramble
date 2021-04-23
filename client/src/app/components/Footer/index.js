import React from "react";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="inner container is-fixed">
                <a className="no-deco" href="/TOS" target="_blank" rel="noopener noreferrer" >terms of service</a>
                <a className="no-deco" href="/FAQ" target="_blank" rel="noopener noreferrer" >FAQ</a>
                <a className="no-deco" href="/Privacy" target="_blank" rel="noopener noreferrer" >privacy policy</a>
                <p>© SeniorSCramble 2021 </p>
            </div>
        </footer>
    )
}

export default Footer;
