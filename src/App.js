import React from 'react'
import ReactTV, { renderOnAppLoaded } from 'react-tv'
import { withNavigation } from 'react-tv-navigation'
import Browse from './Browse'
import Game from './Game'
import Stream from './Stream'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

function App({currentFocusPath}) {
  return (
    <Router>
      <div>
        <Redirect from="" exact to="/" />
        <Switch>
          <Route exact path="/" component={Browse} />
          <Route exact path="/game/:id" component={Game}/>
          <Route exact path="/stream/:id" component={Stream}/>
        </Switch>
      </div>
    </Router>
  )
}

const AppWithNavigation = renderOnAppLoaded(withNavigation(App))

ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'))
