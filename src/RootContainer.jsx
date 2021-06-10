import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NestedList from "./NestedList";
import { Avatar, Button } from "@material-ui/core";
import { PersonAdd, Input } from "@material-ui/icons";
import firebase from "firebase/app";
import ProfileMenu from "./ProfileMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarButton: { marginLeft: theme.spacing(1) },
  menuButton: { marginRight: 36 },
  menuButtonHidden: { display: "none" },
  title: { flexGrow: 1 },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: { width: theme.spacing(7) },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: "100vh", overflow: "auto" },
  container: { paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) },
  paper: { padding: theme.spacing(2), display: "flex", overflow: "auto", flexDirection: "column" },
  fixedHeight: { height: 240 },
}));

export default function RootContainer(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged(setUser);

  const [navMenuIsOpen, setOpenStateOfNavMenu] = useState(false);
  const openMenu = () => setOpenStateOfNavMenu(true);
  const closeMenu = () => setOpenStateOfNavMenu(false);

  const [profileMenuAnchor, setAnchorProfileMenu] = useState(null);
  const openProfileMenu = (event) => setAnchorProfileMenu(event.currentTarget);
  const onClosingProfileMenu = () => setAnchorProfileMenu(null);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, { [classes.appBarShift]: navMenuIsOpen })} color="primary">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openMenu}
            className={clsx(classes.menuButton, { [classes.menuButtonHidden]: navMenuIsOpen })}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            PartyZZ
          </Typography>
          {user ? (
            <div>
              <IconButton onClick={openProfileMenu}>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </IconButton>
              <ProfileMenu user={user} anchor={profileMenuAnchor} onClose={onClosingProfileMenu}></ProfileMenu>
            </div>
          ) : (
            <div>
              <Button
                className={classes.appBarButton}
                variant="contained"
                color="secondary"
                component={Link}
                to={"/login"}
                startIcon={<Input />}
              >
                Login
              </Button>
              <Button
                className={classes.appBarButton}
                variant="contained"
                color="secondary"
                component={Link}
                to={"/register"}
                startIcon={<PersonAdd />}
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper, { [classes.drawerPaperClose]: !navMenuIsOpen }) }}
        open={navMenuIsOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={closeMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NestedList shouldCloseAllItems={!navMenuIsOpen} onItemExpand={openMenu} />
      </Drawer>
      <main>{props.children}</main>
    </div>
  );
}
