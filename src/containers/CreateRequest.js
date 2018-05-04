import React, { Component } from 'react';
import { withRouter } from 'react-router'

import TabBar from '../components/TabBar'
import NavBar from '../components/NavBar'
import DescribeGift from '../components/DescribeGift'
import ItemizeGift from '../components/ItemizeGift'
import NewGiftSummary from '../components/NewGiftSummary'

import {PriceForItems} from '../components/Helpers'

import {CreateNewGift} from "../backend/APIManager";
import { FetchCharityData } from '../backend/APIHelper'
import {StatusDialogKey} from '../components/StatusDialog'


class CreateRequest extends Component {

	constructor(props) {
		super(props)
		// By default, a gift expires a year from today, UTC
		const defaultExpiration = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
		this.state = {		gift:{tags:[],
							title:"",
							description:"",
							expiration: defaultExpiration,
							background: "",
							challenge: "",
							items:[]}}
	}
	componentDidMount() {
		if (this.props.account !== undefined) {
		    FetchCharityData(this.props.account, (charity) => this.setState({charity}))
		}
	  }

	render() {
		const account = this.props.account

		const nextButtonDisabled = (tab) => {
			const gift = this.state.gift
			switch (tab) {
				case 0:
					return gift.title.length === 0 || gift.description.length ===0
				case 1:
					return gift.items.length === 0
				default:
					return false
			}
		}

		const handleSubmit = () => {
			const items = this.state.gift.items.map((itemObj, i) => {
				return {
					itemDescription: itemObj.name,
					quantity: itemObj.num,
					pricePerUnit: itemObj.price,
				} 
			})
			const giftJSON = {
				items,
				title: this.state.gift.title,
				summary: this.state.gift.description,
				tags: this.state.gift.tags,
				background: this.state.gift.background,
				challenge: this.state.gift.challenge,
				ethRecipientAddr: account,
				expiry: this.state.gift.expiration,
				dollars: PriceForItems(items, true),
			}
			CreateNewGift(giftJSON, (err) => {
				this.props.openDialog({
					[StatusDialogKey.TITLE]: "Successfully made a request",
					[StatusDialogKey.CONTENT]: "Now that you've made a request, it's time to wait for a donor to fulfill it. Check out the status of your gift on your homepage.",
					[StatusDialogKey.ERROR]: err,
					[StatusDialogKey.REDIRECT]: '/home/charity'
				})
			})
		} 

		const updateGift = (newGift) => {
			let gift = this.state.gift
			gift = {
				...gift,
				...newGift
			}
			this.setState({gift})
		}

		const displayData = {
			"Basic Information" : <DescribeGift onUpdate = {updateGift} gift={this.state.gift}/>,
			"List of Goods" : <ItemizeGift onUpdate = {updateGift} gift={this.state.gift}/>,
			"Let's do it": <NewGiftSummary gift={this.state.gift} charity={this.state.charity}/>
		}
		return (
			<div>
				<NavBar title="New Request"/>
				<div className="page-container">
					<TabBar displayData={displayData} onSubmit = {handleSubmit} nextButtonDisabled = {nextButtonDisabled}/>
				</div>
			</div>
		)
	}
}

export default withRouter(CreateRequest)

				// <StatusDialog
				// 	open={this.state.dialogOpen}
				// 	title={"Successfully made a request"}
				// 	content={"Now that you've made a request, it's time to wait for a donor to fulfill it. Check out the status of your gift on your homepage."}
				// 	error={this.state.dialogError}
				// 	onClose={() => {
				// 		this.setState({dialogOpen:false})
				// 		this.props.history.push('/home/charity')
				// 	}}/>
