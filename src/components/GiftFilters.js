const HomepageFilter = (showFulfilled) => (charities) => {
    return charities.filter(charity => {
    return !(charity.gifts === undefined ||
        	charity.gifts[0] === undefined ||
        	charity.gifts[0].donorDonationAmt === undefined ||
        	(charity.gifts[0].donorDonationAmt === 0) === showFulfilled ) 
  })
}

export const MerchantFilter = (merchantID) => (charities) => {
	const filteredCharities = HomepageFilter(true)(charities)
	return filteredCharities.filter(charity => charity.gifts[0].ethMerchantAddr === undefined || charity.gifts[0].ethMerchantAddr === merchantID)
}

export const DonorFilter = (charities) =>  {
	return HomepageFilter(false)
}