import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";

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
        padding: '1%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PartyRender({isUpdatable}){
    const { id } = useParams();

    const [state, setState] = React.useState({
        party: null,
        loading: true,
    });
    
    const fetchPartyData = async () => { 
        const snapshot = await firebase.database().ref('partys/' + id).get();
        if (snapshot.exists()) {
            setState({
                party: snapshot.val(),
                loading: false,
            });
        } else {
            console.log("No data available for this party");
        }
    };

    useEffect(() => {
        fetchPartyData();
    }, [] );

    const classes = useStyles();

    return (!state.loading && state.partys !== null ? (
        <Paper className={classes.paper}>
            <form>
                <h2>Affichage des détails de la fête <i>{state.party.name}</i></h2>
                <TextField className={classes.formControl}
                    label="Nom de l'hôte"
                    type="text"
                    defaultValue={state.party.ownerId.forname + ' ' + state.party.ownerId.name}
                    InputProps={{
                        readOnly: !isUpdatable,
                    }}
                />
                <TextField className={classes.formControl}
                    label="Nom de la fête"
                    type="text"
                    defaultValue={state.party.name}
                    InputProps={{
                        readOnly: !isUpdatable,
                    }}
                />
                <br></br>
                <img src={state.party.imageUrl} className={classes.formControl} width={200} alt={state.party.imageName}>
                </img>
                <legend className={classes.formControl}>{state.party.imageName}</legend>
                <TextField className={classes.formControl}
                    label="Nom de l'image"
                    type="text"
                    defaultValue={state.party.imageName}
                    InputProps={{
                        readOnly: !isUpdatable,
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">IDs des invités</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={Object.values(state.party.guestsIds)}
                        //onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={() => (
                            <div className={classes.chips}>
                            {Object.values(state.party.guestsIds).map(guestID => (
                                <Chip key={guestID.id} label={guestID.nickname || `${guestID.forname} ${guestID.name}`} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {Object.values(state.party.guestsIds).map(guestID => (
                            <MenuItem value={guestID.id} key={guestID.id}>{guestID.nickname || `${guestID.forname} ${guestID.name}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br></br>
                <Button type="submit" variant="contained">Mise à jour</Button>
            </form>
        </Paper>
        ) : 
        <LinearProgress />
    )
}