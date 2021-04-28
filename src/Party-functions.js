import Party from './Party';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
  }));

export default function PartyRender({party, isUpdatable}){
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