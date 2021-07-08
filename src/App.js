import "./App.css";
import Particles from "react-particles-js";
import particlesConfig from "./config/particlesConfig";
import PartyList from "./PartyList";
import PartyRender from "./PartyRender";

import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from "react-router-dom";
import RegisterForm from "./routes/RegisterForm";
import Login from "./routes/login";
import { FirebaseAuthConsumer, FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./index";
import RootContainer from "./RootContainer";
import Profile from "./routes/Profile";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#3c425a", light: " #5b6076", contrastText: "#fff" },
    secondary: { main: "#8d8191", light: "#bbb9bc" },
    background: { paper: "#c4c8d9" },
  },
});

// eslint-disable-next-line no-unused-vars
const AuthenticatedRoute = (props) => {
  const location = useLocation();

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        return isSignedIn ? <Route {...props} /> : <Redirect to={{ pathname: "/login", state: { from: location.pathname } }} />;
      }}
    </FirebaseAuthConsumer>
  );
};

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <div className="App">
          <Router>
            <RootContainer>
              <Particles
                style={{ position: "absolute", top: 0, left: 0 }}
                width="100vw"
                height="100wh"
                params={particlesConfig}
              />
              <Switch>
                <Route path={"/login"} component={Login} />
                <Route path={"/register"} component={RegisterForm} />
                <AuthenticatedRoute path={"/profile"} component={Profile} />
                <AuthenticatedRoute path={"/list"} component={PartyList} />
                <AuthenticatedRoute path={"/detail/:id"} component={PartyRender} />
              </Switch>
            </RootContainer>
          </Router>
        </div>
      </FirebaseAuthProvider>
    </MuiThemeProvider>
  );
}
