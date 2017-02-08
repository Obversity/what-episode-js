import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import handleErrors from './HandleErrors';

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

  getInitialState(){
    return {
      event: this.props.question ? this.props.question.event : "",
    }
  },

  cancel(){
    this.props.cancel()
  },

  createOrSaveQuestion(){
    // determine whether in edit mode or create mode
    let url = this.props.question
      ? `http://localhost:3030/episodes/${this.props.episode.id}/questions/${this.props.question.id}`
      : `http://localhost:3030/episodes/${this.props.episode.id}/questions`

    let callback = this.props.question
      ? this.props.editCurrentQuestion
      : this.props.addAndSetCurrentQuestion

    let method = this.props.question
      ? 'PATCH'
      : 'POST'

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: {
          episode_id: this.props.episode.id,
          event: this.state.event,
        }
      })
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => callback(response.question))
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
