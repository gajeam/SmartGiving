import {ItemSent} from '../ethereum/components/ItemSent'
import {ConfirmRequest} from '../backend/EthereumRequestManager'
import {UpdateDatabase} from '../backend/APIManager'
import {StatusDialogConfirmShipment} from '../components/StatusDialog'

export const SelectDonate = component => charity => () => {
  component.props.showCharity(true, charity)
}

export const LearnMore = component => charity => () => {
  component.props.history.push({
    pathname: `/charity/${charity.ethRecipientAddr}/${component.props.userType}`,
    state: { charity }
  })
}

export const ConfirmShipment = component => charity => () => {
	const showDialog = (err) => {
		component.props.openDialog(StatusDialogConfirmShipment(err))
	}
	ItemSent(ConfirmRequest(charity), (err) => {
		if (err !== undefined) showDialog(err)
		else UpdateDatabase((err) => showDialog(err))
	})
  
}

export const PrimaryButtonFunction = (charity, address) => {
	try {
		return (address !== undefined && charity.gifts[0].ethMerchantAddr === address) ? ConfirmShipment : SelectDonate
	} catch(err) {
		return SelectDonate
	}
}