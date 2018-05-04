import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class StatusDialog extends Component {
	render() {
		return (
			<Dialog
				open={this.props.open !== undefined && this.props.open}
				onClose={this.props.onClose}
		        >
                <DialogTitle id="alert-dialog-title">{this.props.error === undefined ? this.props.title : "Error"}</DialogTitle>
		        <DialogContent>
		        	<DialogContentText id="alert-dialog-description">
		        		{this.props.error === undefined ? this.props.content : this.props.error}
		            </DialogContentText>
		        </DialogContent>
				<DialogActions>
		            <Button onClick={this.props.onClose} color="primary" autoFocus>
		              Got it
		            </Button>
				</DialogActions>
			</Dialog>       
		)
	}
}

StatusDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  error: PropTypes.any
}

export default StatusDialog
