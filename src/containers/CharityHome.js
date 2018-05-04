import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar';
import CharityHomeTop from '../components/CharityHomeTop';
import CharityStatusBar from '../components/CharityStatusBar';

import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';

import {FetchCharityData} from '../backend/APIHelper'



const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});


class CharityHome extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		if (this.props.account === undefined)
			return
		FetchCharityData(this.props.account, (charity, gift) => {
			this.setState({charity, gift})	
		} )
	}


	render() {
    const { classes } = this.props;
    	if (this.state.charity === undefined)
    		return <NavBar/>

		return(
		<div>

		  <NavBar/>
		  <div className='charity-status-container'>
			{/*top half of the page*/}
			  <CharityHomeTop charity={this.state.charity}/>

			{/*bottom half of the page*/}
			  <div className='charity-status-requestName'>					  	
			  	<div className="status-bages">
				    <Badge color="secondary" badgeContent={2} className={classes.margin}>
		        	  <Typography className={classes.padding}>Requests made</Typography>
		      		</Badge>
		      		<Badge color="secondary" badgeContent={1} className={classes.margin}>
		        	  <Typography className={classes.padding}>Requests fulfilled</Typography>
		      		</Badge>
	      		</div>
	      		{this.state.gift !== undefined &&
	      			<div>
					    <Typography variant="headline" gutterBottom alignleft='true' paragraph>
						  Status for request <span className = "charity-card-action">"{this.state.gift.title}"</span>
						</Typography>
						<Typography variant="subheading" alignleft='true' paragraph>
						  Click on each status to see more information
						</Typography>
					</div>
				}
	      		{this.state.gift === undefined &&
	      			<div>
					    <Typography variant="headline" gutterBottom alignleft='true' paragraph>
						  You currently have no open requests
						</Typography>
						<Typography variant="subheading" alignleft='true' paragraph>
							<Link to='/createrequest'>Click here to create one.</Link>
						</Typography>
					</div>
				}
				<CharityStatusBar charity={this.state.charity} gift={this.state.gift} account={this.props.account}/>


			  </div>
		  </div>
	    </div>
	    );

	  }
	}


export default withStyles(styles)(CharityHome);

