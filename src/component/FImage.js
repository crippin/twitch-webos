import React from 'react';
import { withFocusable } from 'react-tv-navigation'
import { Link } from "react-router-dom";

const Image = ({focused, focusPath, baseURL, game}) => {
  focused = (focused) ? 'imgfocused' : 'imgunfocused'
  return (
    <Link to={baseURL + game.id}>
      <img src={game.box_art_url.replace("{width}", "420").replace("{height}", "420")} className={focused} />
    </Link>
  )
}

export default withFocusable(Image)
