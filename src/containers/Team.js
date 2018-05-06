import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import NavBar from '../components/NavBar';

import Nat from '../images/Nat.png';
import Morgan from '../images/Morgan.png';
import Liz from '../images/lizlee.png';
import Gabe from '../images/gabe.png';
import Sel from '../images/Sel.png'; 

import ischoolLogo from '../images/berkeleyischool-logo-blue.svg';



const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  intro: {
    width: '60%',
    margin: 40,
  },
  container: {
  	display: 'flex',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around',
  },
  bigAvatar: {
    width: 150,
    height: 150,
    margin: 20,
  },
  caption: {
    width: 150,
    margin: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  logo: {
  	width: '20%',
  	height: '10vh',
  	marginLeft: 40,
  },
  link: {
  	textDecoration: 'none', 
  	color: '#828384',
  }
}); 




class Team extends Component {
// @Natasha write your code here
  render() {

	const { classes } = this.props;

    return (

		<div>
			<NavBar title="Team"/>
				<div className={classes.container}>
					<div className={classes.intro}>
						<Typography variant="subheading" className={classes.container}>
						We created and submitted the SmartGive blockchain-based web application as our final project at University of California, Berkeley, School of Information. Quite a few people were involved in the process, so we are going to thank them after we present the core team:  
						</Typography>
					</div>

					<div className={classes.container}>

						<span className={classes.margin}>
					      <Avatar
					        alt="Morgan"
					        src={Morgan}
					        className={classes.bigAvatar}/>
							<Typography variant="headline" className={classes.caption}>
							<a href="https://www.linkedin.com/in/morgansjordan/" 
							target="_blank" rel="noopener noreferrer"
							className={classes.link}> Morgan Jordan </a>
							</Typography>
						</span>

						<span className={classes.margin}>
					      <Avatar
					        alt="Gabe"
					        src={Gabe}
					        className={classes.bigAvatar}/>
							<Typography variant="headline" className={classes.caption}>
							<a href="https://www.linkedin.com/in/gnicho/" 
							target="_blank" rel="noopener noreferrer"
							className={classes.link}> Gabriel Nicholas </a>
							</Typography>
						</span>

						<span className={classes.margin}>
					      <Avatar
					        alt="Sel"
					        src={Sel}
					        className={classes.bigAvatar}/>
							<Typography variant="headline" className={classes.caption}>
							<a href="https://www.linkedin.com/in/selberthely/" 
							target="_blank" rel="noopener noreferrer" 
							className={classes.link}> Selenne Berthely </a>
							</Typography>
						</span>

						<span className={classes.margin}>
					      <Avatar
					        alt="Liz"
					        src={Liz}
					        className={classes.bigAvatar}/>
							<Typography variant="headline" className={classes.caption}>
							<a href="https://www.linkedin.com/in/lizlee0225/" 
							target="_blank" rel="noopener noreferrer" 
							className={classes.link}> Liz (Hyemin) Lee </a>
							</Typography>
						</span>

						<span className={classes.margin}>
					      <Avatar
					        alt="Nat"
					        src={Nat}
					        className={classes.bigAvatar}/>
							<Typography variant="headline" className={classes.caption}>
							<a href="https://www.linkedin.com/in/natalia-timakova/" 
							target="_blank" rel="noopener noreferrer"
							className={classes.link}> Natalia Timakova </a>
							</Typography>
						</span>
					</div>
					
					<div className={classes.intro}>
						<Typography variant="subheading">
						<span>
						<p>We thank our adviser professor <a href="https://www.ischool.berkeley.edu/people/steven-weber" target="_blank" rel="noopener noreferrer" className={classes.link}>Steven Weber</a>.</p> 
						<p>In the research process, we interviewed a lot of great people who also deserve a mention.</p> 
						<p>Carolyn Acosta from <a href="https://www.cigarra.org" target="_blank" rel="noopener noreferrer" className={classes.link}><i>Cigarra Foundation</i></a>, Colombia, 
						Ana Elenis from <i>Fundación de Ayuda al Debil Mental</i>, and Humberto who runs <i>Unidos por gratitud AC</i>, both in Mexico, 
						- thank you, guys! Your important work was the inspiration behind this project. </p>
						<p><a href="http://alancantorconsulting.com/" target="_blank" rel="noopener noreferrer" className={classes.link}> Alan Cantor</a>, thank you for sharing your invaluable experience with us.</p>
						<p>We would also like to thank our UC Berkeley peers - students who participated in surveys and helped build the product. 
						Bonney Ruan, thank you for helping to code this and for the amazing characters that you created for our "How it works" animation.
						Steve Trush, Jolijn van de Laar, and Justin Duan - your were a great aid in the usability testing.
						Finally, Edward Yip - we shall thank you for our logo. If it weren't for you, we would probably with our weird "alien's hands" logo.</p>
						</span>    
						</Typography>
					</div>
				</div>

				<div>
					<Paper style={{height: '10vh'}}>
						<div className={classes.container}>
						<img src={ischoolLogo} alt='I School Logo' className={classes.logo}/>
						<Typography style={{margin: 'auto'}}>
						102 South Hall #4600, Berkeley, CA 94720-4600
						</Typography></div>
					</Paper>
				</div>
		</div>

    )
  }
}

export default withStyles(styles)(Team)

