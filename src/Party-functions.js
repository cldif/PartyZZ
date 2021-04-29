import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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

function PartyRender({party, isUpdatable}){
    party.initMembers(); // a enlever quand on aura de vraies donnees

    const classes = useStyles();

    return (
        <form>
            <h2>Affichage des détails de la fête <i>{party.name}</i></h2>
            <TextField className={classes.formControl}
                label="ID de l'hôte"
                type="number"
                defaultValue={party.ownerId}
                InputProps={{
                    readOnly: !isUpdatable,
                }}
            />
            <TextField className={classes.formControl}
                label="ID de la fête"
                type="number"
                defaultValue={party.id}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField className={classes.formControl}
                label="Nom de la fête"
                type="text"
                defaultValue={party.name}
                InputProps={{
                    readOnly: !isUpdatable,
                }}
            />
            <br></br>
            <img src={party.imageURL} className={classes.formControl} width={200} alt="Slip">
            </img>
            <legend className={classes.formControl}>{party.imageName}</legend>
            <TextField className={classes.formControl}
                label="Nom de l'image"
                type="text"
                defaultValue={party.imageName}
                InputProps={{
                    readOnly: !isUpdatable,
                }}
            />
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.formControl}>IDs des invités</InputLabel>
                <Select className={classes.formControl}
                    labelId="demo-simple-select-label"
                    value={0}
                    >
                    {party.guestsIDs.map(guestID => (
                        <MenuItem value={guestID} key={guestID}>{guestID}</MenuItem>
                    ))} 
                </Select>
            </FormControl>
            <br></br>
            <Button type="submit" variant="contained">Mise à jour</Button>
        </form>
    )
}

function createData(ownerId, id, name, guests) {
    return { ownerId, id, name, guests };
}

const rows = [
    createData(1, 10, "Nom 1", [1,2,3]),
    createData(2, 20, "Nom un peu plus long", [3,2,1]),
    createData(3, 30, "Nom sacrément long, c'est même exagéré là", [1,1,1]),
    createData(4, 40, "Les 18 ans de Clément", [2,2,2]),
    createData(5, 50, "L'enterrement de El Risitas", [3,3,3]),
];

function PartyList(){
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.paper}>
            <h2>Liste des fêtes actuellement enregistrées</h2>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID hôte</TableCell>
                        <TableCell>ID fête</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Invités</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.ownerId}</TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.guests.map((guest) => (
                            <Chip label={guest} />
                        ))}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export {
    PartyRender,
    PartyList,
}