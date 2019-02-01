import React from 'react';
import { GetStreamFromChannel, GetStreamDataFromChannel } from './TwitchAPI'
import { withFocusable, withNavigation } from 'react-tv-navigation'
const Hls = require('hls.js');


function exitFullScreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  }
}

function toggleFullScreen() {
  var video = document.getElementById("video");
  if (video.webkitRequestFullscreen){
      if (document.webkitFullscreenElement) {
          document.webkitCancelFullScreen();
      } else {
          video.webkitRequestFullscreen();
      }
  } else {
      console.log("Fullscreen API is not supported");
  }
}
const Item = ({focused, focusPath, game}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
      <button id='btnFullScreen' className={focused} onClick={() => toggleFullScreen()}><i class={'fa fa-arrows-alt'} ></i></button>
  )
}
export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      data: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    GetStreamDataFromChannel(id, this.setState)
    GetStreamFromChannel(id, this.setState);
  }

  render(){
    const defaultProps = {
          id: 'video',
          poster: this.props.poster,
          src: this.state.src,
          width: '1920px',
          height: '1080px',
          controls: true,
          autoplay: false,
          preload: true,
          class: 'image',
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
    const FocusableItem = withFocusable(Item)
    if(Hls.isSupported()) {
      hls.attachMedia(video);

    }
    if(this.state.data) {
      return (
        <div class="container">
          <div class="display_name">
            {this.state.data.display_name}
          </div>
          {video}
          <div class="middle">
            <img height="100" src={this.state.data.logo}></img>
          </div>
          <div class="status">
            <p>{this.state.data.status}</p>
            <FocusableItem focusPath="fullscreen"/>
          </div>
        </div>
      );
    }
    return video
  }
}
