import React from 'react';
const Hls = require('hls.js');

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      src: null,
    }
  }
  render(){
    const defaultProps = {
          poster: null,
          src: this.props.src,
          width: 640,
          height: 360,
          controls: true,
          autoplay: true,
          preload: 'auto',
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
