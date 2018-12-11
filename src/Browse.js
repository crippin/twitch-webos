import React from 'react';
import { GetTopGames } from './TwitchAPI'
import Game from './Game'
import { withFocusable, withNavigation } from 'react-tv-navigation'
import { Link } from "react-router-dom";

const Item = ({focused, setFocus, focusPath, game}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <Link to={'/game/' + game.name}>
      <img src={game.box.large} id="gamelist" className={focused} onClick={() => { setFocus() }}/>
    </Link>
  )
}

export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topGames: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentWillMount() {
    GetTopGames(this.setState);
  }
  render(){
    if (this.state.topGames) {
      var imgList = this.state.topGames.map(function (game, index) {
        const FocusableItem = withFocusable(Item)
        return (
          <FocusableItem game={game} focusPath={game.name} key={game.name + index}/>
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
