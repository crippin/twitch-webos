import React from 'react';
import { GetStreamsFromGame } from './TwitchAPI';
import { Link } from "react-router-dom";


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentDidMount () {
    const { id } = this.props.match.params

    console.log(id);
    GetStreamsFromGame(id, this.setState);
  }
  render(){
    if (this.state.streams) {
      var imgList = this.state.streams.map(function (stream, index) {
        console.log(stream);
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
