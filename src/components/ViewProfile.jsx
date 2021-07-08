import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "firebase/auth";
import "firebase/database";
import TextField from "@material-ui/core/TextField";

export default function ViewProfile(props) {

    const state = props.state;
    const setState = props.setState;

    const classes = props.classes;

    const updateProfile = () => {
        setState(prevState => ({
            ...prevState, update: true
        }))
    }

    return (
        <form className="form">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled
                        autoComplete="forname"
                        name="forname"
                        variant="outlined"
                        fullWidth
                        id="forname"
                        label="First Name"
                        value={state.profile.forname}
                        autoFocus
                        className={classes.disabledInput}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Last Name"
                        name="name"
                        value={state.profile.name}
                        autoComplete="lname"
                        className={classes.disabledInput}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        name="nickname"
                        value={state.profile.nickname}
                        autoComplete="nickname"
                        className={classes.disabledInput}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={state.profile.email}
                        autoComplete="email"
                        className={classes.disabledInput}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={updateProfile}
                    >
                        Mettre à jour
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
