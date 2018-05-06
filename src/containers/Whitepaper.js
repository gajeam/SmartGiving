import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Paper from '../data/SmartGivePaper.pdf'

class Whitepaper extends Component {
// @Natasha write your code here


  render() {


    return (
      <div>
        <NavBar title="Whitepaper"/>
          <iframe
             title="Whitepaper"
             style={{ width: '100%', height: '77vh' }}
             src={Paper}
          />

      </div>
    )
  }
}

export default Whitepaper;

