export const GiftStatus = {
	NONE: 0,
	POSTED: 1,
	DONOR_PLEDGED: 2,
	MERCHANT_BIDDED: 3,
	MERCHANT_CHOSEN: 4,
	MERCHANT_SHIPPED: 5,
	DELIVERED: 6
}

export const StatusForGift = gift => {
	const isEmpty = obj => !(obj !== undefined && obj !== '' && obj !== 0)
	if (gift === undefined) {
		return GiftStatus.NONE
	} else if (isEmpty(gift.ethDonorAddr)) {
		return GiftStatus.POSTED
	} else if (gift.itemReceived === true) {
		return GiftStatus.DELIVERED
	} else if (gift.merchantShipped === true) {
		return GiftStatus.MERCHANT_SHIPPED
	} else if (!isEmpty(gift.ethMerchantAddr)) {
		return GiftStatus.MERCHANT_CHOSEN
	} else if (!isEmpty(gift.bids) && gift.bids.length !== 0) {
		return GiftStatus.MERCHANT_BIDDED
	} else if (!isEmpty(gift.ethDonorAddr)) {
		return GiftStatus.DONOR_PLEDGED
	}
}
