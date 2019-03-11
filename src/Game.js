import React from 'react';
import { GetStreamsFromGame } from './TwitchAPI';
import { Link } from "react-router-dom";
import { withFocusable, withNavigation } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath, stream}) => {
  focused = (focused) ? 'imgfocused' : 'imgunfocused'
  return (
    <Link to={'/stream/' + stream.channel.name}>
      <img src={stream.channel.logo} id="gamelist" className={focused} onClick={() => { setFocus() }}/>
    </Link>
  )
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentWillMount () {
    console.log(document.URL);

    const { id } = this.props.match.params
    GetStreamsFromGame(id, this.setState);
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
      <div class="listPictures">
        {imgList}
      </div>);
    }
    return "ALMAFA"
  }
}
