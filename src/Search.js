var React = require('react');
import AutoComplete from 'material-ui/AutoComplete';
import { get } from './Ajax'

var Search = React.createClass({

  findShows: function(searchText){
    this.props.setSearchStatus('searching')
    get("http://localhost:3030/shows.json", { search: searchText })
      .then(response => response.json())
      .then(show => {
         this.props.setShow(show);
         this.props.setSearchStatus('loaded');
      })
  },

  render: function(){
    return (
      <div>
        <AutoComplete
          floatingLabelText="Search for a show"
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={5}
          dataSource={this.props.shows}
          onNewRequest={this.findShows}
          autoFocus={true}
        />
      </div>
    )
  },

});

module.exports = Search;
