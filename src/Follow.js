import React from 'react';
import { GetFollowed } from './TwitchAPI';
import { Link } from "react-router-dom";


export default class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount () {
    GetFollowed(this.setState);
  }
  render(){
    if (this.state.streams) {
      var imgList = this.state.streams.map(function (stream, index) {
        return (
          <div id="gamelist">
            <Link to={'/stream/' + stream.channel.display_name}>
              <img src={stream.channel.logo} />
            </Link>
          </div>
        );
      });
      return(
      <div id="wrapper">
        {imgList}
      </div>);
    }
    return "ALMAFA"
  }
}
