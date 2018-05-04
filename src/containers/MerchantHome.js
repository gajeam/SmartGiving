import React, { Component } from "react"

import HomeTemplate from "../components/HomeTemplate"

import {MerchantPreButtons, MerchantActionButtons, MerchantPostButtons} from '../components/CardComponents'
import {MerchantFilter} from "../components/GiftFilters"
import {WeiToEther} from '../style/Formatter'
import {UserType} from '../components/User'

class MerchantHome extends Component {

  render() {

    const buttons = {
      "pre": ((gift) => MerchantPreButtons(gift, this.props.account)),
      "main": ((charity, actions) => MerchantActionButtons(charity, actions, this.props.account)),
      "post" : ((gift) => MerchantPostButtons(gift))
    }

    const userType = UserType.MERCHANT
    const priceFunc = (gift) => WeiToEther(gift.donorDonationAmt)
    const filter = MerchantFilter(this.props.account)
    const sectioningFunc = (recipients) => {
      const bidFilter = (fulfilled) => (charity) => {
        const bids = charity.gifts[0].bids
        if (charity.gifts[0].itemReceived === true) return false
        return fulfilled === bids.reduce((final, b) => {return final || b.ethMerchantAddr === this.props.account}, false)
      }

      let sections = []
      const activeBids = recipients.filter(bidFilter(true))
      const openBids = recipients.filter(bidFilter(false))

      if (openBids.length !== 0)  sections.push({charities: openBids})
      if (activeBids.length !== 0)  sections.push({title: "Active Bids", charities: activeBids})

      return sections

    }


    return (
      <HomeTemplate store={this.props.store}
                    filter= {filter}
                    buttons={buttons}
                    priceFunc={priceFunc}
                    sectioningFunc={sectioningFunc}
                    userType={userType}
                    account={this.props.account}/>
      )
  }
}


export default MerchantHome

