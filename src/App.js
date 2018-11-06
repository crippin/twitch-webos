import React from 'react';
import ReactTV from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import { GetFollowed, GetStreamFromChannel, GetTopGames } from './TwitchAPI'
import SideBar from './Sidebar'
import Main from './Main'
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
          <SideBar />
          <Main />
        </div>
      </Router>
    );
  }
}

const AppWithNavigation = withNavigation(App)
ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));
