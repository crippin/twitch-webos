import React from 'react';
import { Search as GetResult } from './TwitchAPI';
import { Link } from "react-router-dom";
import { withFocusable, withNavigation } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath, stream}) => {
  focused = (focused) ? 'imgfocused' : 'imgunfocused'
  return (
    <Link to={'/stream/' + stream.name}>
      <img src={stream.logo} id="gamelist" className={focused} onClick={() => { setFocus() }}/>
    </Link>
  )
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
    }
    this.setState = this.setState.bind(this)
  }
  componentWillMount () {
    const { id } = this.props.match.params
    console.log(id);
    GetResult(id, this.setState)
  }
  render(){
    if (this.state.streams) {
      console.log(this.state.streams);
      var imgList = this.state.streams.map(function (stream, index) {
        if(stream.status){
          const FocusableItem = withFocusable(Item)
          return (
            <FocusableItem stream={stream} focusPath={stream.name} key={stream.name + index}/>
          );
        }
      });
      return(
      <div class="listPictures">
        {imgList}
      </div>);
    }
    return (
      <div id="demo" width="800" height="1000" >
        "ALMAFA"
      </div>
    );
  }
}
