import React from "react";
import { withFocusable, withNavigation } from 'react-tv-navigation'
import { Link } from "react-router-dom";

const NavLink = ({focused, setFocus, focusPath, link, icon}) => {
  focused = (focused) ? 'hover' : 'unhover'
  return (
    <Link to={link} class="w3-bar-item w3-button" className={focused}>
      <i class={'fa fa-' + icon} ></i>
    </Link>
  )
}
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const FocusableLink = withFocusable(NavLink)

        return (
          <div id="nav" class="w3-sidebar w3-bar-block w3-black w3-jumbo">
            <FocusableLink link="/" icon="home" focusPath={'/'}/>
            <FocusableLink link="/follow" icon="heart" focusPath={'/follow'}/>
          </div>
        );

    }
}
