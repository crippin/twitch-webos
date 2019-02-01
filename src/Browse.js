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
      search: '',
    }
    this.setState = this.setState.bind(this)


  }
  handleSearch(event) {
    console.log(event.target.value);
    if(event.target.value.length>3)
    this.setState({search: event.target.value})
  }
  componentWillMount() {
    GetTopGames(this.setState);
  }
  render(){
    const SearchItem = ({focused, setFocus, focusPath, value, onChange, onEnter, onClick}) => {
      focused = (focused) ? 'focused' : 'unfocused'
      return (
      <div className={focused} >
        <input type="search" id="site-search" value={value} onClick={evt => this.handleSearch(evt)}/>
      </div>
      );
    }
    const FocusableSearch = withFocusable(SearchItem)
    console.log(this.state.search.length);
    if(this.state.search.length > 3) {
      this.props.history.push('/search/' + this.state.search)
    }
    if (this.state.topGames) {
      var imgList = this.state.topGames.map(function (game, index) {
        const FocusableItem = withFocusable(Item)
        return (
          <FocusableItem game={game} focusPath={game.name} key={game.name + index}/>
        );
      });
      return(
        <div >
          <div id="wrapper">
            <div size="100%" >
              <FocusableSearch focusPath={'asd'} value={this.state.search} />
            </div>
            {imgList}
          </div>
        </div>)
    }
    return "ALMAFA"
  }
}
