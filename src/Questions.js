import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import SeasonSelect from './SeasonSelect';
import EpisodeSelect from './EpisodeSelect';
import Question from './Question';
import QuestionForm from './QuestionForm';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AddIcon from 'material-ui/svg-icons/content/add';
import FlagIcon from 'material-ui/svg-icons/content/flag';
import { handleUnauthorized } from './HandleErrors';
import { put } from './Ajax';

const style = {
  seasonSelect: {
    width: '47%',
    marginRight: '6%',
    display: 'inline-block',
  },
  episodeSelect: {
    width: '47%',
    display: 'inline-block',
  },
  episodeTitle: {
    textAlign: 'center',
  },
  addQuestion: {
    width: '100%',
  },
  questions: {
    position: 'relative',
    height: '100%',
  },
  settingsButton: {
    position: 'absolute',
    top: '-20px',
    right: '-15px',
  },
}


var Questions = React.createClass({

  contextTypes: {
    signedIn: React.PropTypes.bool,
    token: React.PropTypes.string,
    alert: React.PropTypes.func,
  },

  getInitialState: function(){
    return {
      currentSeason: null,
      currentEpisode: null,
      currentQuestion: null,
      creatingQuestion: false,
      editingQuestion: false,
      questionSuccessfullyFlagged: false,
    };
  },

  flagQuestion: function(){
    let url = `episodes/${this.state.currentEpisode.id}/questions/${this.state.currentQuestion.id}/flag`
    put(url, {}, this.context.token)
    .then(response => response.json())
    .then(response => this.setState({ questionSuccessfullyFlagged: true }))
    .catch(handleUnauthorized.bind(this))
  },

  editCurrentQuestion: function(question){
    let episode = this.state.currentEpisode;
    let oldQuestion = episode.questions.find(q => q.id === question.id);
    // replace question in list
    episode.questions[episode.questions.indexOf(oldQuestion)] = question;
    this.setState({
      currentEpisode: episode,
      currentQuestion: question,
      editingQuestion: false,
    })
  },

  startEditingQuestion: function(){
    this.setState({ editingQuestion: true })
  },

  cancelAddOrEdit: function(){
    this.setState({
      editingQuestion: false,
      creatingQuestion: false,
    })
  },

  startCreatingQuestion: function(){
    this.setState({ creatingQuestion: true })
  },

  addAndSetCurrentQuestion: function(question){
    let episode = this.state.currentEpisode;
    episode.questions.push(question)
    this.setState({
      currentEpisode: episode,
      currentQuestion: question,
      creatingQuestion: false,
    })
  },

  incrementSeason: function(increment=1){
    let currentIndex = this.props.show.seasons.indexOf(this.state.currentSeason)
    let nextSeason   = this.props.show.seasons[currentIndex + increment]
    if(nextSeason){
      this.resetForSeason(nextSeason, increment < 0)
    }
  },

  nextSeason: function(){
    this.incrementSeason()
  },

  previousSeason: function(){
    this.incrementSeason(-1)
  },

  incrementEpisode: function(increment = 1){
    let currentIndex = this.state.currentSeason.episodes.indexOf(this.state.currentEpisode)
    let nextEpisode  = this.state.currentSeason.episodes[currentIndex + increment]
    if(nextEpisode) {
      this.resetForEpisode(nextEpisode);
    } else {
      increment > 0 ? this.nextSeason() : this.previousSeason();
    }
  },

  nextEpisode: function(){
    this.incrementEpisode();
  },

  previousEpisode: function(){
    this.incrementEpisode(-1);
  },

  incrementQuestion: function(increment = 1){
    let nextQuestion = this.getNextQuestion(increment)
    if(nextQuestion) this.setState({ currentQuestion: nextQuestion });
  },

  getNextQuestion: function(plusOrMinus = 1){
    let questions = this.state.currentEpisode.questions;
    return questions[questions.indexOf(this.state.currentQuestion) + plusOrMinus];
  },

  nextQuestion: function(){
    this.incrementQuestion();
  },

  previousQuestion: function(){
    this.incrementQuestion(-1);
  },

  resetForEpisode: function(episode){
    this.setState({
      currentEpisode: episode,
      currentQuestion: episode.questions[0],
    });
  },

  resetForSeason: function(season, lastEpisode=false){
    let episode = lastEpisode
      ? season.episodes[season.episodes.length-1]
      : season.episodes[0];
    let question = episode.questions[0];

    this.setState({
      currentSeason: season,
      currentEpisode: episode,
      currentQuestion: question,
    });
  },

  setCurrentSeason: function(event, key, id){
    let season = this.props.show.seasons.find(season => season.id === parseInt(id, 10));
    this.resetForSeason(season);
  },

  setCurrentEpisode: function(event, key, id){
    let episode = this.state.currentSeason.episodes.find(episode => episode.id === parseInt(id, 10));
    this.resetForEpisode(episode);
  },

  componentWillMount: function(){
    let season = this.props.show.seasons[0];
    this.resetForSeason(season);
  },

  componentWillReceiveProps: function(nextProps){
    let newShow = this.props.show.id !== nextProps.show.id
    if(newShow) {
      let season = nextProps.show.seasons[0];
      this.resetForSeason(season);
    }
  },

  render: function(){
    let nextQuestionExists = this.getNextQuestion()
    let previousQuestionExists = this.getNextQuestion(-1)

    let menuItems = []

    let addQuestionButton =  (
      <MenuItem primaryText="Add question"
        leftIcon={<AddIcon />}
        key="add"
        onTouchTap={this.startCreatingQuestion}/>
    )

    let editQuestionButton = (
      <MenuItem primaryText="Edit question"
                leftIcon={<ModeEditIcon />}
                key="edit"
                onTouchTap={this.startEditingQuestion}/>
    )

    let reportQuestionButton = (
      <MenuItem primaryText="Report question"
                leftIcon={<FlagIcon />}
                key="report"
                onTouchTap={this.flagQuestion}/>
    )

    if(this.context.signedIn) menuItems.push(addQuestionButton)
    if(this.context.signedIn && this.state.currentQuestion) menuItems.push(editQuestionButton)
    if(this.state.currentQuestion) menuItems.push(reportQuestionButton)

    let showMenue = !this.state.creatingQuestion &&
                    !this.state.editingQuestion &&
                    menuItems.length > 0

    return (
      <div style={style.questions}>
        {showMenue &&
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={style.settingsButton}
          >
            {menuItems}
          </IconMenu>
        }
        <div style={style.episodeTitle}>
          <p>
            {this.state.currentEpisode.title}
          </p>
        </div>
        <div>
          {this.state.editingQuestion
          ? <QuestionForm episode={this.state.currentEpisode}
                          question={this.state.currentQuestion}
                          cancel={this.cancelAddOrEdit}
                          editCurrentQuestion={this.editCurrentQuestion}/>
          : this.state.creatingQuestion
          ? <QuestionForm episode={this.state.currentEpisode}
                          cancel={this.cancelAddOrEdit}
                          addAndSetCurrentQuestion={this.addAndSetCurrentQuestion} />
          : <Question question={this.state.currentQuestion}
                      nextQuestion={this.nextQuestion}
                      nextQuestionExists={nextQuestionExists}
                      previousQuestion={this.previousQuestion}
                      previousQuestionExists={previousQuestionExists}
                      nextEpisode={this.nextEpisode}
                      previousEpisode={this.previousEpisode}/>}
        </div>
        <div>
          <SeasonSelect style={style.seasonSelect}  seasons={this.props.show.seasons} currentSeason={this.state.currentSeason} setCurrentSeason={this.setCurrentSeason}/>
          <EpisodeSelect style={style.episodeSelect}  episodes={this.state.currentSeason.episodes} currentEpisode={this.state.currentEpisode} setCurrentEpisode={this.setCurrentEpisode}/>
        </div>
        <Snackbar
          open={this.state.questionSuccessfullyFlagged}
          message="Question successfully flagged"
          autoHideDuration={4000}
          onRequestClose={()=>this.setState({ questionSuccessfullyFlagged: false })}
        />
      </div>
    );
  }
});

module.exports = Questions;
