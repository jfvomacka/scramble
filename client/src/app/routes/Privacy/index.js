import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import "./index.scss";

const Privacy = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: process.env.REACT_APP_DEFAULT_LOGIN_REDIRECT },
  };

  return (
    <div className="Privacy">
      <div className="inner container is-fluid">
        <h2>Privacy Policy</h2>

        <p> Senior SCramble operates http://www.seniorscramble.com (the "Site"). This page informs you of our </p>
        <p> policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. </p>
        <p> We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the</p>
        <p>collection and use of information in accordance with this policy.</p>

        <h3> Information Collection and Use</h3>
        <p> While using our Site, we may ask you to provide us with certain personally identifiable information that can be used </p>
        <p> to contact or identify you. Personally identifiable information may include, but is not limited to your name, school, </p>
        <p> preferred method of contact, and a picture of yourself  ("Personal Information").</p>

        <h3> Communications </h3>
        <p> We may use your Personal Information to contact you with newsletters and other information for site operations. </p>

        <h3> Cookies </h3>
        <p> Cookies are files with small amounts of data, which may include an anonymous unique identifier. Cookies are </p>
        <p> sent to your browser from a web site and stored on your computer's hard drive. </p>
        <p> Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies </p>
        <p> all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>

        <h3> Changes to this Privacy Policy </h3>
        <p> This Privacy Policy is effective as of April 2021 and will remain in effect except with respect to any changes in </p>
        <p> its provisions in the future, which will be in effect immediately after being posted on this page. </p>
        <p> We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. </p>
        <p> Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your </p>
        <p> acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. </p>
        <p> If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.</p>
        
        <h3> Contact Us</h3>
        <p> If you have any questions about this Privacy Policy, please contact us at uscseniorscramble@gmail.com. </p>

      </div>
    </div>
  );
};

export default Privacy;