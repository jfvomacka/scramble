import React, { useEffect, Suspense } from "react";
import "./app/styles/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./app/state/authSlice";


import PrivateRoute from "./app/containers/PrivateRoute";
import Navbar from "./app/containers/Navbar";
import Footer from "./app/components/Footer";
import Loading from "./app/components/Loading";

const Signin = React.lazy(() => import("./app/routes/Signin"));
const Signup = React.lazy(() => import("./app/routes/Signup"));
const Landing = React.lazy(() => import("./app/routes/Landing"));
const Profile = React.lazy(() => import("./app/routes/Profile"));
const TOS = React.lazy(() => import("./app/routes/TOS"));
const About = React.lazy(() => import("./app/routes/About"));
const Privacy = React.lazy(() => import("./app/routes/Privacy"));
const Editing = React.lazy(() => import("./app/routes/Editing"));
const Verify = React.lazy(() => import("./app/routes/Verify"));
const Delete = React.lazy(() => import("./app/routes/Delete"));
const Matches = React.lazy(() => import("./app/routes/Matches"));
const Search = React.lazy(() => import("./app/routes/Search"));
const Reset = React.lazy(() => import("./app/routes/Reset"));
const Directory = React.lazy(() => import("./app/routes/Directory"));
const Forgot = React.lazy(() => import("./app/routes/Forgot"));

const App = (props) => {
  //Check and update authentication status
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const expired = new Date(Date.now()) >= new Date(auth.expires);
  useEffect(() => {
    const main = () => {
      if (expired) {
        dispatch(signout());
      }
    };
    main();
  }, [dispatch, expired]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
          <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" {...props} component={Landing} />
                <Route exact path="/signin" {...props} component={Signin} />
                <Route exact path="/signup" {...props} component={Signup} />
                <Route exact path="/tos" {...props} component={TOS} />
                <Route exact path="/about" {...props} component={About} />
                <Route exact path="/privacy" {...props} component={Privacy} />
                <Route exact path="/reset" {...props} component={Reset} />
                <Route exact path="/forgot" {...props} component={Forgot} />
                <PrivateRoute exact path="/profile" {...props} component={Profile} />
                <PrivateRoute exact path="/editing" {...props} component={Editing} />
                <PrivateRoute exact path="/verify" {...props} component={Verify} />
                <PrivateRoute exact path="/delete" {...props} component={Delete} />
                <PrivateRoute exact path="/search" {...props} component={Search} />
                <PrivateRoute exact path="/matches" {...props} component={Matches} />
                <PrivateRoute exact path="/directory" {...props} component={Directory} />

              </Switch>
          </Suspense>
        <Footer />
      </Router>
    </React.Fragment>
  );
};

export default App;
