import React from 'react';
import { Route, Switch } from "react-router-dom";
import Browse from './Browse'
import Game from './Game'
import Stream from './Stream'
import Follow from './Follow'


export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return (
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/follow" component={Follow} />
        <Route exact path="/game/:id" component={Game}/>
        <Route exact path="/stream/:id" component={Stream}/>
      </Switch>
    );
  }
}
