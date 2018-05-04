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
	                <DialogTitle id="alert-dialog-title">{this.props.error === undefined ? this.props.title : "An error occurred"}</DialogTitle>
			        <DialogContent>
			        	<DialogContentText id="alert-dialog-description">
			        		{this.props.error === undefined ? this.props.content : this.props.error.message}
			            </DialogContentText>
			        </DialogContent>
					{this.props.hidebuttons !== true &&
					<DialogActions>
			            <Button onClick={onClick} color="primary" autoFocus>
			              Got it
			            </Button>
					</DialogActions>}
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
	REDIRECT: "redirect",
	HIDE_BUTTONS: "hidebuttons"
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

export const StatusDialogSelectMerchant = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully selected a merchant",
		[StatusDialogKey.CONTENT]: "The merchant should confirm that they have shipped your gift shortly. Once you receive the gift, make sure to confirm that you received it so you can make more requests.",
		[StatusDialogKey.REDIRECT]: '/home/charity',
		[StatusDialogKey.ERROR]: err,
	}
}

export const StatusDialogConfirmShipment = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully confirmed your shipment",
		[StatusDialogKey.CONTENT]: "The money has been transfered to your account. All that's left is for the recipient to confirm that they received your shipment. Then you'll be able to bid on other gifts.",
		[StatusDialogKey.ERROR]: err,
		[StatusDialogKey.REDIRECT]: '/home/merchant'

	}
}

export const StatusDialogConfirmGiftReceived = (err) => {
	return {
		[StatusDialogKey.TITLE]: "Successfully confirmed gift received",
		[StatusDialogKey.CONTENT]: "Thank you for confirming you received your gift. You are now welcome to make more gift requests.",
		[StatusDialogKey.ERROR]: err,
		[StatusDialogKey.REDIRECT]: '/home/charity'

	}
}

export const StatusDialogWaiting = () => {
	return {
		[StatusDialogKey.TITLE]: "Waiting on the blockchain...",
		[StatusDialogKey.CONTENT]: "Please be patient, as transactions on the Ethereum blockchain may take up to a minute.",
		[StatusDialogKey.HIDE_BUTTONS]: true,
	}
}
