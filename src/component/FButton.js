import React from 'react';
import { withFocusable } from 'react-tv-navigation'

const Btn = ({focused, focusPath, id, classN, fas, action}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
      <button id={id}
        className={classN + " " + focused}
        onClick={() => {action()}}
        onKeyDown={(e) => {action(e)}}
      >
        <i class={fas} />
      </button>
  )
}

export default withFocusable(Btn)
