import React from 'react';
const Hls = require('hls.js');

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const defaultProps = {
          poster: this.props.poster,
          src: this.props.src,
          height: 600,
          controls: true,
          autoplay: false,
          preload: true,
    }
    let video = React.createElement('video', defaultProps)
    let hls = new Hls();
    if(Hls.isSupported()) {
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        console.log('HLS.js_READY');
      });
    }
      return video
  }
}
