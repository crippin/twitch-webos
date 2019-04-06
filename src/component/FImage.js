import React from 'react';
import { withFocusable } from 'react-tv-navigation'
import { Link } from "react-router-dom";

const Image = ({focused, focusPath, baseURL, game}) => {
  focused = (focused) ? 'imgfocused' : 'imgunfocused'
  return (
    <Link to={baseURL + game.name}>
      <img src={game.box.large} className={focused} />
    </Link>
  )
}

export default withFocusable(Image)
