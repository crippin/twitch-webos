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
import HomeIcon from "@material-ui/icons/Home";
import FollowIcon from "@material-ui/icons/Bookmarks";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import purple from '@material-ui/core/colors/purple';
import { withFocusable } from 'react-tv-navigation'
import { Link } from "react-router-dom";

const Item = ({focused, setFocus, focusPath, text, link, icon}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <Link to={link} className={focused}>
      <ListItem button key={text} >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        {text}
      </ListItem>
    </Link>
  )
}

const drawerWidth = 280;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    zIndex: 0,
    position: 'relative',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    backgroundColor: '#6441a5',
    color: "white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
});

function SideBar(props) {
  const { classes } = props;
  const MenuItem = withFocusable(Item);
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List>
          <MenuItem focusPath='Browse game' text={'Browse game'} link={'/'} icon={<HomeIcon />} />
          <MenuItem focusPath='Follow' text={'Follow'} link={'/follow'} icon={<FollowIcon />} />
          <MenuItem focusPath='LogIN' text={'LogIn'} link={'/adduser'} icon={<ProfileIcon />} />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
