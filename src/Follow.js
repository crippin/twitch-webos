import React from 'react';
import { GetFollowed } from './TwitchAPI';
import { Link } from "react-router-dom";
import { withFocusable, withNavigation } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath, stream}) => {
  focused = (focused) ? 'imgfocused' : 'imgunfocused'
  return (
    <Link to={'/stream/' + stream.user_name}>
      <img src={stream.thumbnail_url.replace('{width}', '420').replace('{height}','420')} id="gamelist" className={focused} onClick={() => { setFocus() }}/>
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
          <FocusableItem stream={stream} focusPath={stream.user_name} key={stream.user_name + index}/>
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
