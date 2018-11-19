import React from 'react';
import { GetStreamFromChannel, GetStreamDataFromChannel } from './TwitchAPI'
const Hls = require('hls.js');

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
          poster: this.props.poster,
          src: this.state.src,
          controls: true,
          autoplay: false,
          preload: true,
          class: 'image',
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
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
          </div>
        </div>
      );
    }
    return video
  }
}
