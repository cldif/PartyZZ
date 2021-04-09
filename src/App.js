import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterForm from "./routes/RegisterForm";
import SignIn from "./login";
import AppHeader from "./components/AppHeader";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./index";

function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <Router>
        <div className="App">
          <AppHeader />
          <Switch>
            <Route path={"/login"} component={SignIn} />
            <Route path={"/register"} component={RegisterForm} />
          </Switch>
        </div>
      </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
