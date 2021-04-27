import React from 'react';
import {IconButton, Snackbar, SnackbarContent} from '@material-ui/core';
import {Close as CloseIcon, Error as ErrorIcon} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    snackbarContent: {
        backgroundColor: theme.palette.error.dark,
    },
}));

const CoolErrorDisplay = ({id, message, onClose}) => {
    const classes = useStyles();

    return (
    <Snackbar
        open
        autoHideDuration={6000}
        onClose={onClose}
    >
        <SnackbarContent
            className={`${classes.margin} ${classes.snackbarContent}`}
            aria-describedby={id}
            message={
                <span id={id} className={classes.message}>
          <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`}/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>
            ]}
        />
    </Snackbar>
)};

export default CoolErrorDisplay;