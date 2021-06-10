import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {Paper} from '@material-ui/core';
import {Image} from "@material-ui/icons";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";

const useStyles = makeStyles((theme) => ({
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "black"
        }
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Profile() {
    const baseProfile = {
        imageURL: "",
        //email: "",
        name: "",
        forname: "",
        nickname: "",
    }

    const [state, setState] = useState({
        user: {},
        profile: baseProfile,
        update: false,
        loading: true,
    })

    const classes = useStyles();

    if (!state.user.uid) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const query = firebase.database().ref(`/profiles/${user.uid}`)
                query.on('value', function (data) {
                    setState(prevState => ({
                        ...prevState, profile: {...prevState.profile, ...data.toJSON()}, loading: false, user: user
                    }))
                })
            } else {
                setState(prevState => ({...prevState, loading: true}));
            }
        });
    }

    return (
        <Paper>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <h1>User Profile</h1>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Image source={state.profile.imageURL} alt="profils pic"/>
                </Grid>
                <Grid item xs={6} sm={6}>
                    {state.update ?
                        <EditProfile classes={classes} state={state} setState={setState} user={state.user}/> :
                        <ViewProfile classes={classes} state={state} setState={setState}/>
                    }
                </Grid>
            </Grid>
        </Paper>
    );
}