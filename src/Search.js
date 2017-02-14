var React = require('react');
import AutoComplete from 'material-ui/AutoComplete';
import { get } from './Ajax'

var Search = React.createClass({

  contextTypes: {
    alert: React.PropTypes.func,
  },

  findShows: function(searchText){
    this.props.setSearchStatus('searching')
    get('shows.json', { search: searchText })
      .then(response => response.json())
      .then(show => {
         this.props.setShow(show);
         this.props.setSearchStatus('loaded');
      })
      .catch(response => {
        this.context.alert("Something went wrong.");
        this.props.setSearchStatus(null);
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
