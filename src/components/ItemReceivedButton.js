import React, { Component } from 'react';

import {ItemReceived} from '../ethereum/components/ItemReceived'
import {ConfirmRequest} from '../backend/EthereumRequestManager'
import {UpdateDatabase} from '../backend/APIManager'

import {Button} from 'material-ui'
import {StatusDialogConfirmGiftReceived} from '../components/StatusDialog'

class ItemReceivedButton extends Component {

  render() {
    const showDialog = (err) => {
      this.props.openDialog(StatusDialogConfirmGiftReceived(err))
    }
    const itemReceived = () => {
      const charity = this.props.charity
      ItemReceived(ConfirmRequest(charity), (err) => {
        if (err !== undefined) showDialog(err)
        else UpdateDatabase((err) => showDialog(err))
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


