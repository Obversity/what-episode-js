import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

// TODO: do styles programmatically.
// I.e. set a max width of the episode finder component, pass this down as props,
// and calculate pixils for stuff like yes and no buttens
const style = {
  question: {
    position: 'relative',
  },
  margin: 5,
  nextQuestion: {
    position: "absolute",
    right: -50,
    top: 11,
  },
  previousQuestion: {
    position: "absolute",
    left: -57,
    top: 11,
  },
  no: {
    width: "47%",
    marginRight: "6%",
  },
  yes: {
    width: "47%",
  },
  prompt: {
    color: 'rgba(0, 0, 0, 0.298039)',
    textAlign: 'center',
  },
  event: {
    textAlign: 'center',
  },
  eventWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 70,
    marginBottom: 17,
  },
}

class Question extends React.Component {
  render () {
    return (
      <div style={style.question}>
        <p style={style.prompt}>
          Have you seen the bit where...
        </p>
        <div style={style.eventWrapper}>
          <p style={style.event}>
            {this.props.question
              ? this.props.question.event
              : 'There are no questions for this episode.'
            }
          </p>
          <IconButton style={style.previousQuestion} tooltip="Previous Question" disabled={!this.props.previousQuestionExists} onClick={this.props.previousQuestion} >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton style={style.nextQuestion} tooltip="Next Question" disabled={!this.props.nextQuestionExists} onClick={this.props.nextQuestion}>
            <KeyboardArrowRight />
          </IconButton>
        </div>
        <div style={style.yesNoButtons}>
          <RaisedButton label="No" secondary={true} onClick={this.props.previousEpisode} style={style.no} />
          <RaisedButton label="Yes" primary={true} onClick={this.props.nextEpisode} style={style.yes} />
        </div>
      </div>
    )
  }
}

export default Question;
