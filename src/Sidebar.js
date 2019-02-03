import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import purple from '@material-ui/core/colors/purple';
import { withFocusable } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath, game}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <ListItem button key="Browse Game" >
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Browse Game" />
    </ListItem>
  )
}

const drawerWidth = 280;

const styles = theme => ({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: 'white'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#6441a5',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

function ClippedDrawer(props) {
  const { classes } = props;
  const MenuItem = withFocusable(Item);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            Twitch
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <MenuItem focusPath='BROWSE' />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
