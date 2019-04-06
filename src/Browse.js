import React from 'react';
import { GetTopGames } from './TwitchAPI'
import Game from './Game'
import { withFocusable, withNavigation } from 'react-tv-navigation'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FImage from './component/FImage'

const styles = theme => ({
  content: {
    position: 'fixed',
    left: '280px',
    top: '62px',
  }
});


const SearchItem = ({focused, setFocus, focusPath}) => {
  focused = (focused) ? 'focused' : 'unfocused'

  return (
      <input name='search' className={'searchInput ' + focused} placeholder='Search streams'/>
  );
}

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props
    this.state = {
      topGames: null,
      search: '',
    }
    this.setState = this.setState.bind(this)
  }

  handleSearch(value) {
    console.log('event');
    if(value.length>3)
    this.setState({search: value})
  }

  componentWillMount() {
    GetTopGames(this.setState);
  }

  render(){
    const FocusableSearch = withFocusable(SearchItem)
    console.log(this.state.search.length);
    if(this.state.search.length > 3) {
      this.props.history.push('/search/' + this.state.search)
    }
    if (this.state.topGames) {
      var imgList = this.state.topGames.map(function (game, index) {
        return (
          <FImage baseURL="/game/" game={game} focusPath={game.name} key={game.name + index}/>
        );
      });
      return(
        <main className={this.classes.content} id="browseContent" >
          <div class='searchForm'>
            <form class='formClass'
              onSubmit={(evt) => {
                evt.preventDefault()
                this.handleSearch(evt.target.search.value)
              }}
              >
              <FocusableSearch focusPath={'asd'} value={this.state.search} />
            </form>
            <i class="fas fa-search searchIcon" aria-hidden="true"></i>
          </div>
          <div class="listPictures">
            {imgList}
          </div>
        </main>)
    }
    return "ALMAFA"
  }
}

Browse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Browse);
