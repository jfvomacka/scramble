/*
 * This is the main Navbar component. This is imported as NavbarMain in the aggregator component (index.js) in the same folder.
 * The Navbar position is fixed to the top, as a result, it is taken out of the render flow and hence overlaps positionally with the subsequent elements.
 * To fix this, in the aggregator file, an offset div with the same height as the Navbar is being exported along with the NavbarMain component.
 * The offset div takes up the space that would otherwise be occupied by subsequent elements.
 */
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { useDispatch } from "react-redux";
import { signout } from "../../state/authSlice";

const NavbarMain = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickSignout = async (e) => {
    try {
        e.preventDefault();
  
        const res = await axios.delete("/auth/local");
  
        if (res.status === 200) {
          dispatch(signout());
        }
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <nav className="Navbar">
      <div className="inner container is-fixed">
        <NavLink exact activeClassName="active" className="no-deco" to="/">
        HOME
        </NavLink>
        <div className="heart">♥ </div>
        {auth.isAuthenticated ? (
          <React.Fragment>
            <NavLink exact activeClassName="active" className="no-deco" to="/profile">
              PROFILE
            </NavLink>
            <div className="heart">♥ </div>
            <NavLink exact activeClassName="active" className="no-deco" to="/" onClick={onClickSignout}>
              SIGN OUT
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink exact activeClassName="active" className="no-deco" to="/signin">
              SIGN IN
            </NavLink>
           <div className="heart">♥ </div>
            <NavLink exact activeClassName="active" className="no-deco" to="/signup">
              SIGN UP
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavbarMain;
