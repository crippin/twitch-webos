import React from 'react';
import { GetStreamFromChannel } from './TwitchAPI'
const Hls = require('hls.js');

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    GetStreamFromChannel(id, this.setState);
  }
  render(){
    const defaultProps = {
          poster: this.props.poster,
          src: this.state.src,
          height: 600,
          controls: true,
          autoplay: false,
          preload: true,
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
    if(Hls.isSupported()) {
      hls.attachMedia(video);
    }
    return video
  }
}
