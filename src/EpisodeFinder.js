import React from 'react';
import Search from './Search';
import Questions from './Questions';
import CircularProgress from 'material-ui/CircularProgress';
import { get } from './Ajax';

class EpisodeFinder extends React.Component {
  constructor(){
    super()
    this.state = {
      shows: [],
      show: null,
      showsLoaded: false,
      searchStatus: null,
    }
    this.setShow = this.setShow.bind(this);
    this.setSearchStatus = this.setSearchStatus.bind(this);
  }

  setShow(show){
    this.setState({ show });
  }

  setSearchStatus(status){
    this.setState({ searchStatus: status })
  }

  componentDidMount(){
    get('shows_list.json')
      .then(response => response.json())
      .then(shows => this.setState({ shows, showsLoaded: true }))
      .catch(response => console.log(response))
  }

  render(){

    let search = (
      <Search setShow={this.setShow}
              shows={this.state.shows}
              searching={this.state.searching}
              setSearchStatus={this.setSearchStatus}/>
    )

    let hasSeasons = this.state.show && this.state.show.seasons.length > 0

    let showQuestions = this.state.showsLoaded &&
                        this.state.show &&
                        this.state.searchStatus === 'loaded' &&
                        hasSeasons

    let showNoData = this.state.showsLoaded &&
                        this.state.show &&
                        this.state.searchStatus === 'loaded' &&
                        !hasSeasons

    return (
      <div className="episode-finder">
        {search}
        {showQuestions &&
          <Questions show={this.state.show}/>
        }
        {showNoData &&
          <p>
            No data for this show. Come back later!
          </p>
        }
        {this.state.searchStatus === 'searching' &&
          <div style={{ position: 'relative' }}>
            <CircularProgress size={100}
                              style={{ top: 40, marginLeft: '27%'}}/>
          </div>
         }
        {this.state.searchStatus === 'not_found' &&
          <p>
            Show not found
          </p>
        }
      </div>
    );
  }
}

export default EpisodeFinder;
