import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {FirebaseAuthConsumer} from "@react-firebase/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography edge="start" variant="h6" className={classes.title}>
                        PartyZZ
                    </Typography>
                    <Button component={Link} color="inherit" to={'/list'}>Parties</Button>
                    <FirebaseAuthConsumer>
                        {({isSignedIn, firebase}) => {
                            if (isSignedIn === true) {
                                return (
                                    <div>
                                        <Button color="inherit" onClick={() => firebase.app().auth().signOut()}>Sign out</Button>
                                        <Button component={Link} color="inherit" to={'/profile'}>Profile</Button>
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div>
                                        <Button component={Link} color="inherit" to={'/login'}>Login</Button>
                                        <Button component={Link} color="inherit" to={'/register'}>Register</Button>
                                    </div>
                                );
                            }
                        }}
                    </FirebaseAuthConsumer>
                </Toolbar>
            </AppBar>
        </div>
    );
}
