import React, { Component } from 'react'
import web3 from '../web3'
import SmartGift from '../smartgift'

class Bid extends Component {
	state = {
		errorMessage: ''
	}

	onSubmit = async (event) => {
		event.preventDefault()

		try {
			const targetGift = SmartGift('0xd16038d71B68E149B9441dcEEf6C9c8b339701a6') // Provide GIFT ADDRESS
			const accounts = await web3.eth.getAccounts()
			await targetGift.methods
				.merchantBids(web3.utils.toWei('0.019', 'ether')) // Provide BID AMOUNT. 0.019 is the example Bid amount in Ether.
				.send({
					from: accounts[0],
					gas: 1000000
				})

			alert('Success!')
		} catch (err) {
			this.setState({ errorMessage: err.message })
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<button>Bid</button>
				</form>
				<h1>{this.state.errorMessage}</h1>
			</div>
		)
	}
}

export default Bid
