import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import { put } from './Ajax'
import handleEnter from './HandleEnter'

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
      passwordError: "",
      usernameError: "",
      username: "",
      password: "",
    }
  },

  closeSignInModal(){
    this.props.closeSignInModal()
  },

  signIn(){
    this.setState({ signingIn: true })

    let body = { username: this.state.username, password: this.state.password }

    put('authenticate.json', body)
    .then(response => response.json())
    .then(response => {
      this.props.setSignedIn(response.token)
      this.setState({ signingIn: false })
      this.closeSignInModal()
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

  render(){

    return (
      <div>
        <Dialog
          title="Sign in"
          modal={false}
          open={this.props.modalOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={style.modal}
        >
          {this.state.signingIn && <LinearProgress mode="indeterminate" style={style.progress} />}
          <div style={style.modalContent}>
            <TextField hintText="Email or username"
                       onKeyUp={handleEnter(this.signIn, this.closeSignInModal)}
                       autoFocus={true}
                       errorText={this.state.usernameError}
                       onChange={(e, value) => this.setState({ username: value }) }
                       style={style.input}/>
            <TextField hintText="Password"
                       onKeyUp={handleEnter(this.signIn, this.closeSignInModal)}
                       errorText={this.state.passwordError}
                       onChange={(e, value) => this.setState({ password: value }) }
                       type="password"
                       style={style.input} />
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
