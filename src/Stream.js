import React from 'react';
import { GetStreamFromChannel, GetStreamDataFromChannel, SearchGame } from './TwitchAPI'
import { withFocusable, withNavigation } from 'react-tv-navigation'
const Hls = require('hls.js');

function toggleFullScreen(setState, e) {
  console.log(e);
  if((e && e.keyCode === 13) || e == 'undefined'){
    e.preventDefault();
    var video = document.getElementById("vidi");
    if (video.webkitRequestFullscreen){
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
            setState({fullscreen: false})
        } else {
            video.webkitRequestFullscreen();
            setState({fullscreen: true})
        }
    } else {
        console.log("Fullscreen API is not supported");
    }
  }
}
function toogleMute(setState, e) {
  console.log(e);
  if((e && e.keyCode === 13) || e == 'undefined'){
    e.preventDefault();
    var video = document.getElementById("video");
    video.muted = !video.muted;
    setState({mute:video.muted})
  }
}

const FullScreenBtn = ({focused, focusPath, fas, setState}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
      <button id='btnFullScreen'
        className={'controlBtns ' + focused}
        onClick={() => toogleFullScreen(setState)}
        onKeyDown={(e) => toggleFullScreen(setState, e)}
      >
        <i class={fas} />
      </button>
  )
}

const MuteBtn = ({focused, focusPath, fas, setState}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
      <button id='btnMute'
        className={'controlBtns ' + focused}
        onClick={() => toogleMute(setState)}
        onKeyDown={(e) => toogleMute(setState, e)}
      >
        <i class={fas} />
      </button>
  )
}

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      data: null,
      games: null,
      mute: false,
      fullscreen: false,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    GetStreamDataFromChannel(id, this.setState)
    GetStreamFromChannel(id, this.setState);
  }

  render(){
    var muteBtnFas = this.state.mute ? "fas fa-volume-up" : "fas fa-volume-mute"
    var fullScreenBtnFas = this.state.fullscreen ? "fas fa-compress-arrows-alt" : "fas fa-arrows-alt"
    const defaultProps = {
          class: 'video',
          id: 'video',
          poster: this.props.poster,
          src: this.state.src?this.state.src[0].url:null,
          autoplay: false,
          preload: true,
          class: 'image',
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
    var FocusableFSBtn= withFocusable(FullScreenBtn)
    var FocusableMuteBtn= withFocusable(MuteBtn)
    if(Hls.isSupported()) {
      hls.attachMedia(video);
    }
    if(this.state.data) {
      if(!this.state.games) {
        SearchGame(this.state.data.game, this.setState);
      }
      return (
        <div class="streamContainer">
          <div class="streamInfo">
            <img height="128" src={this.state.data.channel.logo} />
            <div class="display_name">
              {this.state.data.channel.display_name}
            </div>
          </div>
          <div class="videoWrapper" id="vidi">
              {video}
              <div class="videoControl">
                <FocusableMuteBtn focusPath="mute" fas={muteBtnFas} setState={this.setState} />
                <div class="controlBtns" id="placeholder" />
                <FocusableFSBtn focusPath="fullscreen" fas={fullScreenBtnFas} setState={this.setState}/>
              </div>
          </div>
          <div class="status">
            <img height="256" src={this.state.games?this.state.games[0].box.large:''}></img>
            {this.state.data.channel.status}
            <br/>
            Viewers:

            {this.state.data.viewers}
          </div>
        </div>
      );
    }
    return video
  }
}
