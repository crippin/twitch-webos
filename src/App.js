import React from 'react';
import ReactTV from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import SideBar from './Sidebar'
import Main from './Main'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
