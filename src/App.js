import React from 'react';
import ReactTV from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import $ from 'jquery';
import Stream from './Stream'

var twitchStreams = require('twitch-get-stream')(Client_ID); // twitch now ENFORCES client id usage, so this is required.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      followed: null,
      src: null,
    }
  }

  componentDidMount() {
    this.GetFollowed();
  }

  GetFollowed(){
    var self = this;
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/followed',
      headers: {
        'Client-ID': Client_ID,
        'Authorization': OAuth
      },
      success: function(json) {
        self.setState({followed: json})
        console.log(json);
    }});
  }


  getStreamFromChannel(channel) {
    var self = this;
    console.log('click' , channel);
    twitchStreams.get(channel)
      .then((stream) => {
          this.setState({src: stream[0].url})
          console.log(stream[0].url);
      }, (reason) => {
        console.log(reason);
      });
  }


  render() {
    if (this.state.src) {
      return <Stream src={this.state.src} ></Stream>
    }else if (this.state.followed) {
      var self = this;
      var imgList = this.state.followed.streams.map(function (stream) {
          return <img src={stream.preview.medium} onClick={() => { self.getStreamFromChannel(stream.channel.name) }} key={stream._id} ></img>;
      })
      return <div>{imgList}</div>
    }
    return (
      <div>Loading...</div>
    );
  }
}

const AppWithNavigation = withNavigation(App)
ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));
