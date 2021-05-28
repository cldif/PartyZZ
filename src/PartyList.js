import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Chip } from '@material-ui/core';
import {Link} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';

import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    table: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    paper: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
    }
}));

export default function PartyList(){
    const [state, setState] = React.useState({
        partys: null,
        loading: true,
    });
    
    const fetchPartyData = async () => { 
        const snapshot = await firebase.database().ref('partys/').get();
        if (snapshot.exists()) {
            setState({
                partys: snapshot.val(),
                loading: false,
            });
        } else {
            console.log("No data available");
        }
    };

    useEffect(() => {
        fetchPartyData();
    }, [] );

    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.paper}>
            <h2>Liste des fêtes actuellement enregistrées</h2>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom hôte</TableCell>
                        <TableCell>Nom fête</TableCell>
                        <TableCell>Invités</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!state.loading && state.partys !== null ? Object.values(state.partys).map(row => {
                    return (
                        <TableRow key={row.id}>
                            <TableCell>{row.ownerId.forname + ' ' + row.ownerId.name}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{Object.values(row.guestsIds).map((guest) => (
                                guest.nickname && <Chip key={guest.id} label={guest.nickname} />
                            ))}
                            </TableCell>
                            <TableCell>
                                <Button component={Link} color="inherit" to={'/detail/' + row.id}>Details</Button>
                            </TableCell>
                        </TableRow>
                        )
                    }) : 
                    <LinearProgress />
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}