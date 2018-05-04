import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class StatusDialogContainer extends Component {
	render() {
		const onClick = () => {
			this.props.onClose()
			if (this.props.redirect !== undefined) {
				this.props.history.push(this.props.redirect)
			}
		}

		return (
			<div className = "status-dialog-container">
				{this.props.children}
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
			            <Button onClick={onClick} color="primary" autoFocus>
			              Got it
			            </Button>
					</DialogActions>
				</Dialog>       
			</div>
		)
	}
}

StatusDialogContainer.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  redirect: PropTypes.string,
  error: PropTypes.any
}

export default withRouter(StatusDialogContainer)


export const StatusDialogKey = {
	TITLE: "title",
	CONTENT: "content",
	ERROR: "error",
	REDIRECT: "redirect"
}