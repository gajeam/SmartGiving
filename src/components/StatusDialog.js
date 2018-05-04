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

export const StatusDialogCreateRequest = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully made a request",
		[StatusDialogKey.CONTENT]: "Now that you've made a request, it's time to wait for a donor to fulfill it. Check out the status of your gift on your homepage.",
		[StatusDialogKey.ERROR]: err,
		[StatusDialogKey.REDIRECT]: '/home/charity'
	}
}

export const StatusDialogMakeDonation = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully made a donation",
		[StatusDialogKey.CONTENT]: "Thank you so much for making a donation! Now it's time to wait on a merchant to bid on it. In the mean time, feel free to check out other charities in need.",
		[StatusDialogKey.ERROR]: err,
		[StatusDialogKey.REDIRECT]: '/home/donor'
	}
}

export const StatusDialogMakeBid = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully made a bid",
		[StatusDialogKey.CONTENT]: "We'll let you know if the charity accepts your bid or if someone else bids lower than you on this gift.",
		[StatusDialogKey.ERROR]: err,
		[StatusDialogKey.REDIRECT]: '/home/merchant'
	}
}