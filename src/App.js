import React from 'react';
import ReactTV from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import Stream from './Stream'
import { GetFollowed, GetStreamFromChannel } from './TwitchAPI'
import SideBar from './Sidebar'
import { Carousel } from '3d-react-carousal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
      loadStream: null,
    }
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    GetFollowed(this.setState);
  }

  imgToStream(stream) {
    this.setState({loadStream: stream});
  }

  render() {
    var self = this;
    if (this.state.loadStream) {
      var imgList = this.state.streams.map(function (stream, index) {
        if (stream.channel.name == self.state.loadStream.channel.name) {
          return (
              <div>
              <div class="channel-name">
                {stream.channel.name}
              </div>
                <Stream poster={stream.preview.large} src={stream.src} onClick={() => {}}/>
              </div>
            );
        }
            return (
              <div>
              <div class="channel-name">
                {stream.channel.name}
              </div>
                <img height='600' src={stream.preview.large} onClick={function() {
                    self.imgToStream(stream)
                  }}/>
              </div>
            );
      })
      return (
        <div id="App">
            <SideBar />
          <div id="page-wrap">
            <Carousel slides={imgList} />
          </div>
        </div>
      );
    } else
    if (this.state.streams) {
      var imgList = this.state.streams.map(function (stream, index) {
            return (
              <div>
              <div class="channel-name">
                {stream.channel.name}
              </div>
                <img height='600' src={stream.preview.large} onClick={function() {
                    self.imgToStream(stream)
                  }}
                  />
              </div>
            );
      })
      return (
        <div id="App">
            <SideBar />
          <div id="page-wrap">
            <Carousel slides={imgList} />
          </div>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

const AppWithNavigation = withNavigation(App)
ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));
