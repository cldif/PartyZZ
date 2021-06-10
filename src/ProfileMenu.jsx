import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Popover } from "@material-ui/core";
import { AccountBox, Settings } from "@material-ui/icons";
import firebase from "firebase/app";

export default function ProfileMenu({ user, anchor, onClose }) {
  return (
    <Popover
      PaperProps={{ style: { borderRadius: 16 } }}
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
      elevation={8}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Box p={2}>
        <Typography variant="subtitle1">{user.displayName || "unknown username"}</Typography>
        <Typography variant="subtitle2">{user.email || "unknown email"} </Typography>
      </Box>
      <Divider />
      <List dense component="nav">
        <ListItem button component={Link} to="/profile" onClick={onClose}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/settings" onClick={onClose}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Box textAlign="center" mb={1} mx={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            firebase.auth().signOut();
            onClose();
          }}
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
}
