import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorDisplay from "../components/ErrorDisplay";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        PartyZZ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    forname: "",
    nickname: "",
  });
  let baseErrorState = {
    error: "",
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    nickname: false,
    forname: false,
  };
  const [errorState, setErrorState] = useState(baseErrorState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const register = async (event) => {
    setErrorState(baseErrorState);
    event.preventDefault();

    Object.keys(state).forEach((key) => {
      if (state[key] === "") {
        setErrorState((prevState) => ({
          ...prevState,
          [key]: true,
        }));
      }
    });

    if (state.email !== "" && state.password === state.confirmPassword) {
      await firebase
        .app()
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .catch((error) => {
          setErrorState((prevState) => ({
            ...prevState,
            error: error.message,
          }));
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorState((prevState) => ({
                ...prevState,
                email: true,
              }));
              break;
            case "auth/weak-password":
              setErrorState((prevState) => ({
                ...prevState,
                password: true,
              }));
              break;
            case "auth/invalid-email":
              setErrorState((prevState) => ({
                ...prevState,
                email: true,
              }));
              break;
            default:
              setErrorState((prevState) => ({
                ...prevState,
                email: true,
                password: true,
              }));
              break;
          }
        });

      // Extra work after success
      if (firebase.app().auth().currentUser !== null) {
        let profile = {
          name: state.name,
          forname: state.forname,
          nickname: state.nickname,
          photoURL: "",
          imageName: "",
          id: firebase.app().auth().currentUser.uid,
        };
        await firebase
          .app()
          .database()
          .ref("/profiles/" + firebase.app().auth().currentUser.uid)
          .set(profile)
          .catch((error) => {
            setErrorState((prevState) => ({
              ...prevState,
              error: error.message,
            }));
          });
      }
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        error: "Password do not match",
        password: true,
        confirmPassword: true,
      }));
    }
  };

  const classes = useStyles();

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (isSignedIn === true) {
          return <Redirect to="/home" />;
        } else {
          return (
            <Container
              className={classes.paperContainer}
              component="main"
              maxWidth="sm"
            >
              <Paper elevation={3} className={classes.paper}>
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errorState.forname}
                          autoComplete="forname"
                          name="forname"
                          variant="outlined"
                          required
                          fullWidth
                          id="forname"
                          label="First Name"
                          value={state.forname}
                          autoFocus
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errorState.name}
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          label="Last Name"
                          name="name"
                          value={state.name}
                          autoComplete="lname"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errorState.nickname}
                          variant="outlined"
                          required
                          fullWidth
                          id="nickname"
                          label="Nickname"
                          name="nickname"
                          value={state.nickname}
                          autoComplete="nickname"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errorState.email}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={state.email}
                          autoComplete="email"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errorState.password}
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          value={state.password}
                          autoComplete="current-password"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errorState.confirmPassword}
                          variant="outlined"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          value={state.confirmPassword}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={register}
                    >
                      Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href={"/login"} color="primary">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
                <Box mt={5}>
                  <Copyright />
                </Box>
                {errorState.error !== "" && (
                  <ErrorDisplay
                    onClose={() =>
                      setErrorState((prevState) => ({
                        ...prevState,
                        error: "",
                      }))
                    }
                    message={errorState.error}
                  />
                )}
              </Paper>
            </Container>
          );
        }
      }}
    </FirebaseAuthConsumer>
  );
}
