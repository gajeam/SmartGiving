import {UnixFromString, DollarsToEther, EtherToWei, WeiToEther} from '../style/Formatter'

export const DonationRequest = (charity, money) => {
	const gift = charity.gifts[0]
	return {
		recipientAddress : charity.ethRecipientAddr,
		expiry: UnixFromString(gift.expiry),
		databaseID: gift._id,
		ether: DollarsToEther(money).toString()
	}
}

export const BidRequest = (charity, money) => {
	const gift = charity.gifts[0]
	return {
		giftAddress : gift.ethGiftAddr,
		ether: WeiToEther(EtherToWei(money) - 10).toString() // Subtract ten to stay safe from bidding too high
	}
}

export const ChooseMerchantRequest = (gift, merchantAddress) => {
	return {
		giftAddress: gift.ethGiftAddr,
		merchantAddress
	}
}

export const ConfirmRequest = (charity) => {
	const gift = charity.gifts[0]
	return {
		giftAddress: gift.ethGiftAddr
	}
}