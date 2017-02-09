import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import handleErrors from './HandleErrors'

const style = {
  button: {
    position: 'fixed',
    top: 5,
    right: 5,
  },
  modal: {
    maxWidth: 400
  },
  input: {
    margin: 10,
    width: '90%'
  },
  modalContent: {
    marginTop: 10
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    margin: 10,
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  }
}

const LoginButton = React.createClass({

  getInitialState(){
    return {
      modalOpen: false,
      passwordError: "",
      usernameError: "",
    }
  },

  openSignInModal(){
    this.setState({ modalOpen: true })
  },

  closeSignInModal(){
    this.setState({ modalOpen: false, signingIn: false })
  },

  signIn(){
    this.setState({ signingIn: true })
    fetch('http://localhost:3030/authenticate.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      this.props.setSignedIn(true, response.token)
      this.setState({ signingIn: false, modalOpen: false })
    })
    .catch(response => {
      response.json().then(json => {
        let errors = json.errors
        this.setState({
          passwordError: errors.password_error,
          usernameError: errors.username_error,
          signingIn: false,
        })
      })
    })
  },

  signOut(){
    this.props.setSignedIn(false)
  },

  render(){

    return (
      <div>
        {this.props.signedIn
          ?
          <FlatButton label="Sign out" onTouchTap={this.signOut} style={style.button}/>
          :
          <FlatButton label="Sign in" onTouchTap={this.openSignInModal} style={style.button}/>
        }
        <Dialog
          title="Sign in"
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={style.modal}
        >
          {this.state.signingIn && <LinearProgress mode="indeterminate" style={style.progress} />}
          <div style={style.modalContent}>
            <TextField hintText="Email or username" errorText={this.state.usernameError} onChange={(e, value) => this.setState({ username: value }) } style={style.input}/>
            <TextField hintText="Password" errorText={this.state.passwordError} onChange={(e, value) => this.setState({ password: value }) } type="password" style={style.input} />
            <div style={style.modalButtons}>
              <RaisedButton label="Sign in" primary={true} disabled={this.state.signingIn} onTouchTap={this.signIn} style={style.modalButton} />
              <RaisedButton label="Cancel" secondary={true} disabled={this.state.signingIn} onTouchTap={this.closeSignInModal} style={style.modalButton} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
})

export default LoginButton
