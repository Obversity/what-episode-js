import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EpisodeSelect extends React.Component {
  render () {
    let options = this.props.episodes.map(episode => {
      return <MenuItem key={episode.id} value={episode.id} primaryText={episode.number} />
    })
    return (
      <div style={this.props.style}>
        <SelectField floatingLabelText="Skip to episode"
                     value={this.props.currentEpisode.id}
                     onChange={this.props.setCurrentEpisode}
                     style={{ width: "100%" }}>
          {options}
        </SelectField>
      </div>
    )
  }
}

export default EpisodeSelect;
