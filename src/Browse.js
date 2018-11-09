import React from 'react';
import { GetTopGames } from './TwitchAPI'
import Game from './Game'
import { Link } from "react-router-dom";


export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topGames: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount() {
    GetTopGames(this.setState);
  }
  render(){
    if (this.state.topGames) {
      var imgList = this.state.topGames.map(function (game, index) {
        return (
          <div id="gamelist">
            <Link to={'/game/' + game.name}>
              <img src={game.box.large} />
            </Link>
          </div>
        );
      });
      return(
      <div id="wrapper">
        {imgList}
      </div>);
    }
    return "ALMAFA"
  }
}
