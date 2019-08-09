import React from 'react';
import { withFocusable, withNavigation } from 'react-tv-navigation'
import {docRef, setOAuth, OAUTH} from './OAuth'


export default class AddTwitchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "" }
  }
  componentWillMount () {
    if(docRef){
      docRef.get()
        .then((doc) => {
          if (!doc.exists) {
            this.setState({code: generateCode()})
            docRef.set({
              ActivateME: this.state.code
            });
            showOnConsole(this.state.code)
          } else if (doc.data().ActivateME) {
            this.setState({code: doc.data().ActivateME})
            showOnConsole(this.state.code)
          } else if (doc.data().OAUTH != undefined) {
            // TODO:token working?
            setOAuth(doc.data().OAUTH);
          } else {
            this.setState({code: generateCode()})
          }
        });
    }
  }
  render(){
    if(OAUTH){
      // TODO:token working?
      return (
        <div>
          READYTOGOOGOGOGOGO
          {setTimeout(() => {
            this.props.history.push('/follow')
          },5000)}
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

function showOnConsole(code) {
  console.log('Visit: https://twitch-link.firebaseapp.com');
  console.log(' --------------------------- ');
  console.log(' |                         | ');
  console.log(' | PLEASE ACTIVATE YOUR TV | ');
  console.log(` |     CODE:  ${code}        | `);
  console.log(' --------------------------- ');
}
