import React from 'react';
import { withFocusable, withNavigation } from 'react-tv-navigation'
import {docRef, setOAuth, OAUTH} from './OAuth'

export default class AddTwitchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: generateCode() }
  }
  componentWillMount () {
    if(docRef){
      docRef.get()
        .then((doc) => {
          if (!doc.exists) {
            docRef.set({
              ActivateME: this.state.code
            });
            console.log(' --------------------------- ');
            console.log(' |                         | ');
            console.log(' | PLEASE ACTIVATE YOUR TV | ');
            console.log(` |     CODE:  ${this.state.code}        | `);
            console.log(' --------------------------- ');
          } else {
            setOAuth(doc.data().OAUTH);
          }
        });
    }
  }
  render(){
    if(OAUTH){
      return (
        <div>
          READYTOGOOGOGOGOGO
        </div>
      )
    }
    return (
      <div>
        Visit the website : https://twitch-link.firebaseapp.com
        Enter the CODE:
        {this.state.code}
      </div>
    );
  }
}
function generateCode() {
  var out = "";
  const POSSIBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < 5; i++) {
    out += POSSIBLE.charAt(Math.random() * POSSIBLE.length)
  }
  return out;
}
