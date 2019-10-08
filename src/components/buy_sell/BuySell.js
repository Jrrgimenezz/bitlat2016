import React, { Component } from 'react';
import './Buysell.css';
import Factura from './components/factura/Factura'
import Formulario from './components/formulario/Formulario'
import ABI from './ABI'
var Web3 = require('web3')
let web3js;

class BuySell extends Component {

  constructor(props) {
      super(props);
      this.state = {
        tab : 0,
        contractInstance: '',
        currency: '',
        price: 100,
        account: '',
        balance: 0,
        fee: 0.01,
        tokenAddress: '',
        order: {
          tokenQuantity: 0,
          exchanges: [],
          orderAddresses: [],
          orderValues: [],
          exchangeFees: [],
          v: [],
          r: [],
          s: []
        },
      };
      this.handleUpdateState = this.handleUpdateState.bind(this)
  }

  handleUpdateState(config) {
    this.setState(config)
}



  startApp() {

    web3js.eth.getAccounts((error, accounts) => {
      var acc = accounts;
      if(acc.length === 0){console.log("You should unlock your account!")}
      else {
      web3js.eth.getAccounts((error, accounts) => acc = accounts)
      this.setState({account: acc[0]})
      web3js.eth.getBalance(acc[0], (error, bal) =>{
        this.setState({balance: web3js.utils.fromWei(bal, 'ether')})


    })}
    this.setState({web3: web3js, contractInstance: new web3js.eth.Contract(ABI, "")})

  })
}

    componentDidMount() {
  //    window.addEventListener('load', () => {
  //    if (typeof Web3 !== 'undefined') {
  //      console.log(window.web3)
  //      web3js = new Web3(web3.currentProvider)
  //      this.startApp()
  //      }
  //    else (console.log("ERROR"))
  //    })
    }


  render() {
    return (
      <div className="myBackground">
        <div className="textoArriba">
          <h1 className="textoIntroductorio"> El modo más rápido y seguro de acceder a Tokens ERC20 </h1>
        </div>

        <div className="reubicacionComponentes">

          <Formulario order={this.state.order} handleUpdateState={this.handleUpdateState} contractInstance={this.state.contractInstance}
      tokenAddress= {this.state.tokenAddress} currency={this.state.currency} balance={this.state.balance} price={this.state.price} account={this.state.account}
      web3={this.state.web3}/>

          <Factura tab={this.state.tab} tokenQuantity={this.state.order.tokenQuantity}
            fee={this.state.fee} currency={this.state.currency} price={this.state.price} />
          </div>
      </div>
    );
  }
}

export default BuySell;
