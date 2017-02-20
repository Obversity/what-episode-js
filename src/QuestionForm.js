import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { handleUnauthorized } from './HandleErrors';
import { post, patch } from './Ajax';
import handleEnter from './HandleEnter';

const style = {
  cancel: {
    width: "47%",
    marginRight: "6%",
  },
  save: {
    width: "47%",
  },
  prompt: {
    color: 'rgba(0, 0, 0, 0.298039)',
    textAlign: 'center',
  },
}

const QuestionForm = React.createClass({

  contextTypes: {
    token: React.PropTypes.string,
    alert: React.PropTypes.func,
  },

  getInitialState(){
    return {
      validationError: '',
      event: this.props.question ? this.props.question.event : "",
    }
  },

  cancel(){
    this.props.cancel()
  },

  handleValidationError(response){
    if(response.status == 400){
      response.json().then(json =>{
        this.setState({ validationError: json.errors[0] })
      })
    } else throw response
  },

  createOrSaveQuestion(){
    let body = {
      question: {
        episode_id: this.props.episode.id,
        event: this.state.event,
      }
    }
    // determine whether in edit mode or create mode
    let url = this.props.question
      ? `episodes/${this.props.episode.id}/questions/${this.props.question.id}`
      : `episodes/${this.props.episode.id}/questions`

    let callback = this.props.question
      ? this.props.editCurrentQuestion
      : this.props.addAndSetCurrentQuestion

    let fetchMethod = this.props.question
      ? patch
      : post

    fetchMethod(url, body, this.context.token)
    .then(response => response.json())
    .then(response => callback(response.question))
    .catch(handleUnauthorized.bind(this))
    .catch(this.handleValidationError)
    .catch(response => this.context.alert("Something went wrong"))
  },

  updateEventText(event, text){
    this.setState({ event: text })
  },

  render () {
    return (
      <div>
        <p style={style.prompt}>
          Have you seen the bit where...
        </p>
        <TextField
          autoFocus={true}
          onKeyUp={handleEnter(this.createOrSaveQuestion, this.cancel)}
          onChange={this.updateEventText}
          hintText="Try to avoid spoilers"
          value={this.state.event}
          errorText={this.state.validationError}
          multiLine={true}
          rowsMax={3} />
        <div>
          <RaisedButton style={style.cancel} label="Cancel" secondary={true} onClick={this.cancel} />
          <RaisedButton style={style.save} label="Save" primary={true} onClick={this.createOrSaveQuestion} />
        </div>
      </div>
    )
  }
})

export default QuestionForm;
