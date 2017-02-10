import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { handleUnauthorized } from './HandleErrors';
import { post, patch } from './Ajax';

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
      event: this.props.question ? this.props.question.event : "",
    }
  },

  cancel(){
    this.props.cancel()
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
      ? `http://localhost:3030/episodes/${this.props.episode.id}/questions/${this.props.question.id}`
      : `http://localhost:3030/episodes/${this.props.episode.id}/questions`

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
        <TextField autoFocus={true} onChange={this.updateEventText} hintText="Try to avoid spoilers" value={this.state.event}/>
        <div>
          <RaisedButton style={style.cancel} label="Cancel" secondary={true} onClick={this.cancel} />
          <RaisedButton style={style.save} label="Save" primary={true} onClick={this.createOrSaveQuestion} />
        </div>
      </div>
    )
  }
})

export default QuestionForm;
