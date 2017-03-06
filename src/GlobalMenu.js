import React, { PropTypes } from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const style = {
  position: 'absolute',
  top: 5,
  right: 5,
}

const GlobalMenue = React.createClass({

  render () {
    return (
      <div style={style}>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          {this.props.signedIn
            ?
            <MenuItem primaryText="Sign out" onTouchTap={this.props.setSignedOut} />
            :
            <MenuItem primaryText="Sign in" onTouchTap={this.props.openSignInModal} />
          }
        </IconMenu>
      </div>
    )
  }
})

export default GlobalMenue
