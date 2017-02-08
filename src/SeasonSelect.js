import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SeasonSelect extends React.Component {
  render () {
    let options = this.props.seasons.map(season => {
      return <MenuItem key={season.id} value={season.id} primaryText={season.number} />
    })
    return (
      <div style={this.props.style}>
        <SelectField floatingLabelText="Skip to season"
                     value={this.props.currentSeason.id}
                     onChange={this.props.setCurrentSeason}
                     style={{ width: '100%' }}>
          {options}
        </SelectField>
      </div>
    )
  }
}

export default SeasonSelect;
