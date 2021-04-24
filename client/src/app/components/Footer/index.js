import React from "react";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="inner container is-fixed">
                <a className="no-deco" href="/tos" rel="noopener noreferrer" >terms of service</a>
                <a className="no-deco" href="/about" rel="noopener noreferrer" >any questions?</a>
                <a className="no-deco" href="/privacy" rel="noopener noreferrer" >privacy policy</a>
                <p>© SeniorSCramble 2021 </p>
            </div>
        </footer>
    )
}

export default Footer;
