import React, { Component } from "react"
import {UserType} from '../components/User'
import {TextField, Button, RadioGroup, Radio, FormControlLabel} from 'material-ui'
import NavBar from '../components/NavBar'

import {CreateNewRecipient, CreateNewMerchant, GetAllOpenGifts, GetAllMerchants} from '../backend/APIManager'

import '../style/CreateUser.css'

class CreateRecipient extends Component {
	render() {
		const fields = ['title', 'contact_name', 'about', 'email', 'location', 'website', 'facebook', 'instagram', 'twitter', 'image']
		const addressField = 'ethRecipientAddr'
		const createAPI = CreateNewRecipient
		return <CreateUserFactory fields={fields}
									createAPI={createAPI}
									fetchAPI={GetAllOpenGifts}
									addressField={addressField}
									address={this.props.address}
									type={UserType.RECIPIENT}/>
	}
}

class CreateMerchant extends Component {
	render() {
		const fields = ['name', 'email', 'location', 'storeDescription', 'minShipment', 'maxShipment']
		const addressField = 'ethMerchantAddr'
		const createAPI = CreateNewMerchant
		return <CreateUserFactory fields={fields}
									createAPI={createAPI}
									fetchAPI={GetAllMerchants}
									addressField={addressField}
									address={this.props.address}
									type={UserType.MERCHANT}/>
	}
}

class CreateUserFactory extends Component {
	constructor(props) {
		super(props)
		this.state={[this.props.addressField]: this.props.address, gifts:[]}
	}
	componentDidMount() {
		this.props.fetchAPI((gifts) => this.setState({gifts}))
	}

	render() {

		const buttonFunc = () => {
			let params = this.state
			params.gifts = undefined
			this.props.createAPI(this.state, (err) => {
				if (err === undefined) alert(`Created a new user for ETH address ${this.props.address}`)
				else alert(err)
			})
		}
		const textField = (field, key) => {
			const onChange = (event) => {this.setState({[field]: event.target.value})}
			return(
				<div className = "create-user-textfield-container" key={key}>
				 <TextField onChange={onChange} className = "create-user-textfield"
						multiline rows = "4" rowsMax= "50" placeholder = {field}/>
				</div>
			)
		}

		const existingUser = () => {
			 const user = this.state.gifts.filter(g => g[this.props.addressField] === this.props.address)
			 return user.length === 0 ? undefined : user[0]
		}
		const containsUser = () => existingUser() !== undefined && this.props.address !== undefined
		return (
			<div>
				<div className = "create-user-all-textfields">
					{this.props.fields.map((f, i) => textField(f, i))}
				</div>
				{!containsUser() &&
					<div className = "create-user-address-field">
						{this.props.addressField} for {this.props.type} is
						<span className = "create-user-address"> {this.props.address !== undefined ? this.props.address : "not set"}</span>
					</div>
				}
				{containsUser() &&
					<div className = "create-user-address-found">
						{this.props.address} already exists for {this.props.type} {existingUser().title}.
					</div>
				}
				<Button disabled={containsUser()} onClick={buttonFunc} style={{margin:"10px"}} variant="raised" color="secondary">Create {this.props.type}</Button>
			</div>
		)
	}
}


class CreateUser extends Component {
	constructor(props) {
		super(props)
		this.state = {value:UserType.RECIPIENT}
	}
	render() {
          // <RadioGroup
          //   aria-label="gender"
          //   name="gender1"
          //   className={classes.group}
          //   value={this.state.value}
          //   onChange={this.handleChange}
          // >
          //   <FormControlLabel value="female" control={<Radio />} label="Female" />
          //   <FormControlLabel value="male" control={<Radio />} label="Male" />
	    const userType = this.state.value
	    let userSection
		switch (userType) {
			case UserType.RECIPIENT:
				userSection = <CreateRecipient address={this.props.account}/>
				break
			case UserType.MERCHANT:
				userSection = <CreateMerchant address={this.props.account}/>
				break
			default:
				userSection =  <div/>
				break
		}
		return (
			<div>
				<NavBar title={`Create ${userType}`}/>
				<div className="page-container">
					<RadioGroup
						value={this.state.value}
						onChange={(event) =>this.setState({value:event.target.value})}
					>
			            <FormControlLabel value={UserType.RECIPIENT} control={<Radio />} label="Recipient" />
			            <FormControlLabel value={UserType.MERCHANT} control={<Radio />} label="Merchant" />
		            </RadioGroup>
					{userSection}

				</div>
			</div>
		)

	}
}

export default CreateUser