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
const Item2 = ({focused, setFocus, focusPath}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <Link to={'/follow'}>
      <img width="450px" src="https://vignette.wikia.nocookie.net/logopedia/images/f/fa/Twitch_logo_with_icon.svg/revision/latest?cb=20140727180704" alt="twitch-logo-font" className={true} onClick={() => { setFocus(); console.log("ALMAAA"); }}/>
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
    const FocusableItem2 = withFocusable(Item2)
    if (this.state.topGames) {
      var imgList = this.state.topGames.map(function (game, index) {
        const FocusableItem = withFocusable(Item)
        return (
          <FocusableItem game={game} focusPath={game.name} key={game.name + index}/>
        );
      });
      return(
      <div id="wrapper">
        <FocusableItem2 focusPath="follow"/>
        {imgList}
      </div>);
    }
    return "ALMAFA"
  }
}
