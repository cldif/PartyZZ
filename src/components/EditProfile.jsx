import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default function EditProfile(props) {

    const state = props.state;
    const setState = props.setState;

    let baseErrorState = {
        error: false,
        errorMessage: "",
        //email: false,
        name: false,
        nickname: false,
        forname: false,
        imageURL: false,
    };

    const handleChange = (e) => {
        const {id, value} = e.target
        console.log(id)
        setState(prevState => ({
            ...prevState, profile: {...prevState.profile, [id]: value}
        }))
    }

    const [errorState, setErrorState] = useState(baseErrorState)

    const cancel = () => {
        setState(prevState => ({
            ...prevState, update: false
        }))
    }

    const updateProfile = async (event) => {
        setErrorState(baseErrorState);
        event.preventDefault();

        Object.keys(state.profile).forEach((key) => {
            if (state[key] === "") {
                setErrorState(prevState => ({
                    ...prevState, [key]: true, error: true
                }))
            }
        })

        if (!errorState.error) {
            await firebase.database().ref(`/profiles/${state.user.uid}`).update(state.profile).then(() => {
                    setState(prevState => ({...prevState, update: false}))
                }
            ).catch(error => {
                setErrorState(prevState => ({
                    ...prevState, errorMessage: error.message
                }))
            })
        }
    }

    const classes = this.props.classes;

    return (
        <form className="form">
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
                        value={state.profile.forname}
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
                        value={state.profile.name}
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
                        value={state.profile.nickname}
                        autoComplete="nickname"
                        onChange={handleChange}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled
                        error={errorState.email}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={state.profile.email}
                        autoComplete="email"
                        onChange={handleChange}
                        className={classes.disabledInput}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={updateProfile}
                    >
                        Enregistrer
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={cancel}
                    >
                        Annuler
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
