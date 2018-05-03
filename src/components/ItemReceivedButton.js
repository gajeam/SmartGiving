import React, { Component } from 'react';

import {ItemReceived} from '../ethereum/components/ItemReceived'
import {ConfirmRequest} from '../backend/EthereumRequestManager'
import {UpdateDatabase} from '../backend/APIManager'

import {Button} from 'material-ui'

class ItemReceivedButton extends Component {

  render() {

    const itemReceived = () => {
      const charity = this.props.charity
      ItemReceived(ConfirmRequest(charity), (err) => {
        if (err !== undefined) alert(err)
        else UpdateDatabase(() => console.log("Finished confirming shipment"))
     })
    }

    return (
    <div>
        <Button size="medium" variant="raised" color="primary" onClick={itemReceived}>Yes, I received my shipment</Button>
      </div>
    )
  }
}

export default ItemReceivedButton


