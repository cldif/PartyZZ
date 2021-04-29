import "./App.css";
import Particles from "react-particles-js";
import particlesConfig from "./config/particlesConfig";
import SignIn from "./login";
import Party from './Party';
import PartyRender from './Party-functions';
import {PartyList} from './Party-functions';

import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import RegisterForm from "./routes/RegisterForm";
import Login from "./routes/login";
import AppHeader from "./components/AppHeader";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./index";

const AuthenticatedRoute = (props) => {
  const location = useLocation();

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        return isSignedIn ? (
          <Route {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: location.pathname } }}
          />
        );
      }}
    </FirebaseAuthConsumer>
  );
};

{/*
    <div className="App">
      <PartyRender party={new Party(0, '')} isUpdatable={false}/>
    </div>*/}

export default function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <Router>
        <div
          className="App"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <AppHeader />
          <div style={{ position: "absolute" }}>
            <Particles height="100vh" width="100vw" params={particlesConfig} />
          </div>
          <header className="App-header">
            <Switch>
              <Route path={"/login"} component={Login} />
              <Route path={"/register"} component={RegisterForm} />
            </Switch>
          </header>
        </div>
      </Router>
    </FirebaseAuthProvider>
  );
}
