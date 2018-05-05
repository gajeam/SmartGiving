import React, { Component } from "react";
import { connect } from "react-redux";
import {
  HashRouter,
  Route,
  Switch // Displays the first route that matches
} from "react-router-dom";

import { ParallaxProvider } from "react-skrollr";

import Home from './containers/Home'
import Howitworks from './containers/Howitworks'
import Whoops404 from './containers/Whoops404'
import CharityHome from './containers/CharityHome'
import DonorHome from './containers/DonorHome'
import MerchantHome from './containers/MerchantHome'
import CreateRequest from './containers/CreateRequest'
import GiftPage from './containers/GiftPage'
import GetAllStats from './ethereum/components/GetAllStats'
import GetActiveGifts from "./containers/GetActiveGifts"
import Team from './containers/Team'
import Contribute from './containers/Contribute'
import Whitepaper from './containers/Whitepaper'
import CreateUser from './containers/CreateUser'
import StatusDialogContainer, {StatusDialogKey} from './components/StatusDialog'

import {PollUserAddress, CancelPollUserAddress} from './components/User'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
    	light: "#49BBFF",
    	main: "#317EAC",
    	dark: "#245D7F",
    	contrastText: 'white',
    },
    secondary: {
    	light: "#FFBB49",
    	main: "#EDAE44",
    	dark: "#7F5E25",
    	contrastText: 'white',
    },
  },
  status: {
    danger: 'orange',
  },
});


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {dialogObject:{}, dialogOpen:false}
	}
	componentDidMount() {
		PollUserAddress((account) => {
			this.setState({account})
		})
	}
	componentWillUnmount() {
		CancelPollUserAddress()
	}
	render() {
		const openDialog = (dialogObject) => {
			this.setState({dialogObject, dialogOpen:true})
		}
		const dialog = this.state.dialogObject
		
		return (
		  <MuiThemeProvider theme={theme}>
			<ParallaxProvider
				init={{
					smoothScrolling: true,
					smoothScrollingDuration: 1000,
					forceHeight: false
				}}
			>
				<HashRouter>
					<div className="main">
						<StatusDialogContainer
							open={this.state.dialogOpen}
							title={dialog[StatusDialogKey.TITLE]}
							content={dialog[StatusDialogKey.CONTENT]}
							error={dialog[StatusDialogKey.ERROR]}
							redirect={dialog[StatusDialogKey.REDIRECT]}
							hidebuttons={dialog[StatusDialogKey.HIDE_BUTTONS]}
							onClose={() => {
								if (dialog[StatusDialogKey.HIDE_BUTTONS] !== true)
									this.setState({dialogOpen:false})
						}}>
						<Switch>
							<Route
								exact
								path="/"
								component={Home} />

							<Route path="/home/team" component={Team} />

							<Route path="/home/contribute" component={Contribute} />

							<Route path="/home/whitepaper" component={Whitepaper} />

							<Route path="/home/howitworks" component={Howitworks} />
							
							<Route
								path="/home/donor"
								component={() => <DonorHome store={this.props.store} account={this.state.account} openDialog={openDialog}/>}
							/>

							<Route
								path="/home/charity"
								component={() => <CharityHome store={this.props.store} account={this.state.account} openDialog={openDialog}/>}
							/>

							<Route
								path="/home/merchant"
								component={() => <MerchantHome store={this.props.store} account={this.state.account} openDialog={openDialog}/>}
							/>
							<Route
								path="/charity/:charityID/:userType"
								component={() => <GiftPage store={this.props.store} openDialog={openDialog}/>}
							/>
							<Route
								path="/createrequest"
								component={() => <CreateRequest account={this.state.account} openDialog={openDialog}/>}
							/>
							<Route
								path="/getallstats"
								component={() => <GetAllStats store={this.props.store} />}
							/>
							<Route
								path="/getActiveGifts"
								component={() => <GetActiveGifts store={this.props.store} />}
							/>
							<Route
								path="/createuser"
								component={() => <CreateUser account={this.state.account}/>}
							/>
							<Route component={Whoops404} />
						</Switch>
						</StatusDialogContainer>

					</div>
				</HashRouter>
			</ParallaxProvider>
		  </MuiThemeProvider>
		)
	}
}

const mapStateToProps = state => {
  return state;
};

App = connect(mapStateToProps, null)(App);

export default App



