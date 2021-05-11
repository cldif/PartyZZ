import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper, Snackbar } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginIcon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: { margin: theme.spacing(3, 0, 2) },
}));

export default function Login(props) {
  const classes = useStyles();

  const [successfulLogin, setSuccessfulLogin] = useState(false);

  const [formContent, setFormContent] = useState({
    email: undefined,
    password: undefined,
  });

  const [errorState, setErrorState] = useState({
    email: false,
    password: false,
    displayErrorSnackBar: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormContent((prevState) => ({ ...prevState, [id]: value }));
    setErrorState((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(formContent.email, formContent.password)
      .then(() => setSuccessfulLogin(true))
      .catch((_error) => {
        setErrorState({
          email: true,
          password: true,
          displayErrorSnackBar: true,
        });
      });
  };

  return successfulLogin ? (
    <Redirect to={props.location.state?.from || "/"} />
  ) : (
    <div>
      <Container className={classes.paperContainer} maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Avatar className={classes.loginIcon}>
            <LocalBarIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              error={errorState.email}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              id="password"
              error={errorState.password}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={errorState.displayErrorSnackBar}
        autoHideDuration={2000}
        onClose={() =>
          setErrorState((previous) => ({
            ...previous,
            displayErrorSnackBar: false,
          }))
        }
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          Your email and password are not recognized.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
