import React from 'react'
import ReactTV, { renderOnAppLoaded } from 'react-tv'
import { withNavigation } from 'react-tv-navigation'
import Browse from './Browse'
import Game from './Game'
import Stream from './Stream'
import Search from './Search'
import Follow from './Follow'
import Sidebar from './Sidebar';
import palmServiceBridgeMock from 'palmservicebridge-mock';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

function App({currentFocusPath}) {
  return (
    <Router>
      <div class="wrapper">
        <AppBar class="header">
          <Toolbar>
            <Typography variant="h4" color="inherit" >
              Twitch
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="content">
          <Sidebar />
          <Redirect from="" exact to="/" />
          <Switch>
            <Route exact path="/" component={Browse} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/game/:id" component={Game}/>
            <Route exact path="/stream/:id" component={Stream}/>
            <Route exact path="/search/:id" component={Search}/>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

const AppWithNavigation = renderOnAppLoaded(withNavigation(App))

ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'))
