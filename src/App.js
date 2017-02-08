import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import EpisodeFinder from './EpisodeFinder';
import LoginButton from './LoginButton'
import './App.css'

//TODO:
// - AUTHENTICATION
//

// TODO: think about what we want to do when there few or no questions
// - what about when there are no questions for the first episode?
// - what about when there are questions for one episode but not the next


///MAYBE:
// have an 'edit' mode for the question interface
//
//
// MAYBE: Impement a 'question type' thing, so rather than it always being
//  'have you seen the bit where..'
// it could be
// 'At the moment is/are...'
// This needs some thought. You might want to jump to a certain episode / season given certain answers
//
// consider using swipe interface for yes no?
// http://oliviertassinari.github.io/react-swipeable-views/
// drag and drop useful somehow?
// https://react-dnd.github.io/react-dnd/examples-chessboard-tutorial-app.html

injectTapEventPlugin();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      signedIn: false,
      flashMessageActive: false,
      flashMessage: "",
      token: null,
    }
    this.setSignedIn = this.setSignedIn.bind(this);
  }

  setSignedIn(signedIn, token){
    this.setState({
      signedIn: signedIn,
      flashMessageActive: true,
      flashMessage: "Successfully signed in",
      token: token
    })
  }

  // TODO: work out some way so that all components have the ability to trigger a flash message using the below snackbar.
  // It makes no sense to have a snackbar for each component that needs one.
  // Same with an error dialog.

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <EpisodeFinder />
          <LoginButton signedIn={this.state.signedIn} setSignedIn={this.setSignedIn}/>
          <Snackbar
           open={this.state.flashMessageActive}
           message={this.state.flashMessage}
           autoHideDuration={3000}
           onRequestClose={()=>this.setState({ flashMessageActive: false })}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
