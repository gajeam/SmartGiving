import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import NavBar from '../components/NavBar';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  intro: {
  	textAlign: 'center',
  	marginTop: '30vh',
  },
  container: {
  	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around',
  },
  link: {
  	textDecoration: 'none', 
  	color: '#828384',
  }
}); 


class Contribute extends Component {
// @Natasha write your code here
  render() {
  	const { classes } = this.props;

    return (

		<div>
			<NavBar title="Contribute"/>
				<div>
					<div  className={classes.intro}>
						<Typography variant="subheading" className={classes.container}>
						We used Solidity and React to bring this idea to life. If you speak either of these, you are welcome to pull request.  
						</Typography>
					</div>

					<div className={classes.container}>
						<span className={classes.margin}>
							<Typography variant="headline">
							<a href="https://github.com/gajeam/SmartGiving_web" 
							target="_blank" rel="noopener noreferrer" className={classes.link}> GitHub Repo </a>
							</Typography>
						</span>
					</div>
				</div>

		</div>

    )
  }
}

export default withStyles(styles)(Contribute)

