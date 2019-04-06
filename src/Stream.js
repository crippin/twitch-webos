import React from 'react';
import { GetStreamFromChannel, GetStreamDataFromChannel, SearchGame } from './TwitchAPI'
import { withFocusable, withNavigation } from 'react-tv-navigation'
import FButton from './component/FButton'
const Hls = require('hls.js');


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

  toggleFullScreen(e) {
    console.log(e);
    if((e && e.keyCode === 13) || e == 'undefined'){
      var video = document.getElementById("vidi");
      if (video.webkitRequestFullscreen){
          if (document.webkitFullscreenElement) {
              document.webkitCancelFullScreen();
              this.setState({fullscreen: false})
          } else {
              video.webkitRequestFullscreen();
              this.setState({fullscreen: true})
          }
      } else {
          console.log("Fullscreen API is not supported");
      }
      e.preventDefault();
    }
  }

  toogleMute(e) {
    console.log(e);
    if((e && e.keyCode === 13) || e == 'undefined'){
      var video = document.getElementById("video");
      video.muted = !video.muted;
      this.setState({mute:video.muted})
      e.preventDefault();
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    GetStreamDataFromChannel(id, this.setState)
    GetStreamFromChannel(id, this.setState);
  }

  render(){
    var muteBtnFas = this.state.mute ? "fas fa-volume-up" : "fas fa-volume-mute"
    var fullScreenBtnFas = this.state.fullscreen ? "fas fa-compress-arrows-alt" : "fas fa-arrows-alt"
    var defaultProps = {
          class: 'video',
          id: 'video',
          poster: this.props.poster,
          src: this.state.src?this.state.src[0].url:null,
          autoplay: true,
          preload: true,
          class: 'image',
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
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
                <FButton focusPath="mute" fas={muteBtnFas} id="MuteButton" classN="controlBtns"  action={(e) => this.toogleMute(e)} />
                <div class="controlBtns" id="placeholder" />
                <FButton focusPath="fullscreen" fas={fullScreenBtnFas} id="FullScreenButton" classN="controlBtns" action={(e) => this.toggleFullScreen(e)} />
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
