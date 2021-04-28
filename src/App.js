import "./App.css";
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
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./index";

const AuthenticatedRoute = (props) => {
  const location = useLocation();

  if (firebase.auth().currentUser == null)
    return (
      <Redirect
        to={{ pathname: "/login", state: { from: location.pathname } }}
      />
    );
  return <Route {...props} />;
};

export default function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <Router>
        <div className="App">
          <AppHeader />
          <Switch>
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={RegisterForm} />
          </Switch>
        </div>
      </Router>
    </FirebaseAuthProvider>
  );
}
