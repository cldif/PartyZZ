import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CoolErrorDisplay from "./CoolErrorDisplay";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import { Redirect } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PartyZZ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterForm() {


    const [state, setState] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        forname: "",
        nickname: "",
    })
    let baseErrorState = {
        error: "",
        mailError: false,
        passwordError: false,
        passwordConfirmError: false,
    };
    const [errorState, setErrorState] = React.useState(baseErrorState)

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const register = async (event) => {
        setErrorState(baseErrorState);
        event.preventDefault();

        if (state.password === state.confirmPassword) {
            await firebase.app().auth().createUserWithEmailAndPassword(state.email, state.password).catch((error) => {
                setErrorState(prevState => ({
                        ...prevState, error: error.message
                    }
                ))
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setErrorState(prevState => ({
                                ...prevState, mailError: true
                            }
                        ))
                        break;
                    case "auth/weak-password":
                        setErrorState(prevState => ({
                                ...prevState, passwordError: true
                            }
                        ))
                        break;
                    case "auth/invalid-email":
                        setErrorState(prevState => ({
                                ...prevState, mailError: true
                            }
                        ))
                        break;
                    default:
                        setErrorState(prevState => ({
                                ...prevState, mailError: true, passwordError: true
                            }
                        ))
                        break;
                }
            });

            // Extra work after success
            if(firebase.app().auth().currentUser !== null){
                let profile = {
                    name: state.name,
                    forname: state.forname,
                    nickname: state.nickname,
                    photoURL: "",
                    imageName: "",
                    id: firebase.app().auth().currentUser.uid
                }
                await firebase.app().database().ref('/profiles/'+firebase.app().auth().currentUser.uid).set(profile).catch((error) => {
                        setErrorState(prevState => ({
                                ...prevState, error: error.message
                            }
                        ))
                });
            }
        } else {
            setErrorState(prevState => ({
                    ...prevState, error: "Password do not match", passwordError: true, passwordConfirmError: true
                }
            ))
        }
    }

    const classes = useStyles();

    return (
        <FirebaseAuthConsumer>
            {({isSignedIn}) => {
                if (isSignedIn === true) {
                    return <Redirect to="/home"/>;
                } else {
                    return (
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
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
                                                error={errorState.mailError}
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
                                                error={errorState.passwordError}
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
                                                error={errorState.passwordConfirmError}
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
                                            <Link href={'/login'} color="primary">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                            {errorState.error !== "" && (
                                <CoolErrorDisplay
                                    onClose={() => setErrorState(prevState => ({
                                            ...prevState, error: ""
                                        }
                                    ))}
                                    message={errorState.error}
                                />
                            )}
                        </Container>
                    );
                }
            }}
        </FirebaseAuthConsumer>
    );
}