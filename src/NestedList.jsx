import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import InfoIcon from "@material-ui/icons/Info";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FiberNewIcon from "@material-ui/icons/FiberNew";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%", maxWidth: 360 },
  nested: { paddingLeft: theme.spacing(4) },
}));

export default function NestedList({ shouldCloseAllItems, onItemExpand }) {
  const classes = useStyles();
  const [expand, setExpand] = useState({ partys: false });

  const toggleExpand = (id) =>
    setExpand((previous) => ({ ...previous, [id]: !previous[id] }));

  const handleClick = (listEntryId) => {
    const wasExpanded = expand[listEntryId];
    toggleExpand(listEntryId);
    if (!wasExpanded) {
      onItemExpand();
    }
  };

  useEffect(() => {
    if (shouldCloseAllItems) {
      setExpand((currentExpand) => {
        Object.keys(currentExpand).map((key) => (currentExpand[key] = false));
        return { ...currentExpand };
      });
    }
  }, [shouldCloseAllItems]);

  const entryIdentifiers = { partys: "partys" };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={() => handleClick(entryIdentifiers.partys)}>
        <ListItemIcon>
          <LocalBarIcon />
        </ListItemIcon>
        <ListItemText primary="Fêtes" />
        {expand[entryIdentifiers.partys] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse
        in={expand[entryIdentifiers.partys]}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Consulter la liste" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Créer une fête" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="A propos" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <FiberNewIcon />
        </ListItemIcon>
        <ListItemText primary="Nouveautés" />
      </ListItem>
    </List>
  );
}
