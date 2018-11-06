import React from 'react';
import ReactTV from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import Stream from './Stream'
import { GetFollowed, GetStreamFromChannel, GetTopGames } from './TwitchAPI'
import SideBar from './Sidebar'
import Browse from './Browse'
import Game from './Game'
import { Carousel } from '3d-react-carousal';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
      loadStream: null,
    }
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    GetFollowed(this.setState);
  }

  imgToStream(stream) {
    this.setState({loadStream: stream});
  }

  render() {
    var self = this;
    return (
      <Router>
        <div>
          <Link to="/" >LINK</Link>
          <Switch>
            <Route exact path="/" component={Browse} />
            <Route exact path="/game/:id" component={Game}/>
            <Route exact path="/stream/:id" component={Stream}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const AppWithNavigation = withNavigation(App)
ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));
