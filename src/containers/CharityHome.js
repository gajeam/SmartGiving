import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar';
import CharityHomeTop from '../components/CharityHomeTop';
import CharityStatusBar from '../components/CharityStatusBar';

import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';

import {GetAllOpenGifts} from '../backend/APIManager'



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
		this.state = {
		    activeStep: 0,
		    completed: new Set(),
		    skipped: new Set(),
	  	}
	}

	componentDidMount() {
		if (this.props.account === undefined)
			return
		GetAllOpenGifts((data, err) => {
			if (err !== undefined){
				alert(err)
				return
			}
			const charityFilter = data.filter(d => d.ethRecipientAddr === this.props.account)
			if (charityFilter.length === 0) {
				alert(new Error(`No charity set for ${this.props.account}`))
				return
			}
			const charity = charityFilter[0]
			let gift
			try {
				gift = charity.gifts[0]
			} catch(err) {
				gift = undefined
			}
			this.setState({charity, gift})
		})
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
						  Status for Request "March Supplies for Children's Art Project"
						</Typography>
						<Typography variant="subheading" alignleft='true' paragraph>
						  Click on each status to see more information
						</Typography>
						<CharityStatusBar/>
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

			  </div>
		  </div>
	    </div>
	    );

	  }
	}


export default withStyles(styles)(CharityHome);

