import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepButton } from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';

import {GiftStatus, StatusForGift} from '../components/GiftStatus'
import SelectMerchant from '../components/SelectMerchant'
import ItemReceivedButton from '../components/ItemReceivedButton'

import "../style/Components.css";

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

/*Project Status timeline*/
function getSteps() {
  return ['Post request', 'Donor pledged', 'Merchants bidded', 'Choose merchant', 'Merchant shipped', 'Verify delivery'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Post your request so it would be available for donors to see and pledge';
    case 1:
      return 'Step 2: A donor made their pledge';
    case 2:
      return 'Step 3: All merchants placed their bids';
    case 3:
      return 'Step 4: Choose a merchant';
    case 4:
      return 'Step 5: Merchant will confirm when they ship the goods';
    case 5: 
      return 'Step 6: Verify that the package arrived to you safe and sound';
    case 6:
      return 'Congratulations! You finished your gift.';
    default:
      return 'Unknown step';
  }
}



class CharityStatusBar extends Component {
	state = {
    activeStep: StatusForGift(this.props.gift),
    completed: new Set(),
    skipped: new Set(),
  };


    totalSteps = () => {
    return getSteps().length;
  };

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() ;
  }


/*Project status timeline buttons*/


  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

	render() {

    const gift = this.props.gift
    const giftStatus = StatusForGift(gift)

    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

		return(

			  <div className={classes.root}> 
		        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
		          {steps.map((label, index) => {
		            const props = {};
		            const buttonProps = {};

		            return (
		              <Step key={label} {...props}>
		                <StepButton
		                  onClick={this.handleStep(index)}
		                  completed={index < giftStatus}
		                  {...buttonProps}
		                >
		                  {label}
		                </StepButton>
		              </Step>
		            );
		          })}
		        </Stepper>

		        <div>
		          {this.allStepsCompleted() ? (
		            <div>
		              <Typography className={classes.instructions}>
		                All steps completed. Congratulations with your successful campaign!
		              </Typography>
		            </div>
		          ) : (

		            <div>
		              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
		            </div>

		          )}
		        </div>
            {giftStatus === GiftStatus.MERCHANT_BIDDED &&
              <SelectMerchant account={this.props.account} gift={this.props.gift} charity={this.props.charity}/>
            }
            {giftStatus === GiftStatus.MERCHANT_SHIPPED &&
              <ItemReceivedButton charity={this.props.charity}/>
            }
		      </div>

			)
	} 


}

export default withStyles(styles)(CharityStatusBar)
