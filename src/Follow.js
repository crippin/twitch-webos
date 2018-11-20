import React from 'react';
import { GetFollowed } from './TwitchAPI';
import { Link } from "react-router-dom";
import { withFocusable, withNavigation } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath, stream}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <Link to={'/stream/' + stream.channel.name}>
      <img src={stream.channel.logo} id="gamelist" className={focused} onClick={() => { setFocus() }}/>
    </Link>
  )
}

export default class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentWillMount () {
    GetFollowed(this.setState);
  }
  render(){
    if (this.state.streams) {
      var imgList = this.state.streams.map(function (stream, index) {
        const FocusableItem = withFocusable(Item)
        return (
          <FocusableItem stream={stream} focusPath={stream.channel.name} key={stream.channel.name + index}/>
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
