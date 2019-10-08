import React, { Component } from 'react'
import Eth from 'ethjs'
import TokenSelector from './TokenSelector'
const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

class CompraVenta extends Component {

  generateUrl(order) {
    var ret = "https://app.bitlat.com/api/get_best?makerTokenAddress=" + weth + "&takerTokenAddress=" + this.props.tokenAddress
    if(this.props.isBuy){
      ret += "&baseTokenAddress=" + weth
    } else {
      ret += "&baseTokenAddress=" + this.props.tokenAddress
    }
    ret += "&quantity=" + Eth.toWei(order.tokenQuantity, 'ether').toString()
    ret += "&takerAddress=" + weth
    return ret
  }

  handleFormulario() {
    var defaultAccount = this.props.account
    var orderValues
    var valor = this.props.order.tokenQuantity * this.props.price
    var tokens = Eth.toWei(this.props.order.tokenQuantity, 'ether')
    valor = Math.ceil(valor*10000000)/10000000
    orderValues = this.props.order.orderValues
    this.crearOrdenCompra(orderValues, valor, defaultAccount, tokens)
}


  crearOrdenCompra(orderValues, valor, defaultAccount, tokens) {
     this.props.contractInstance.methods.createBuyOrder(
       this.props.tokenAddress,
       tokens,
       this.props.order.exchanges,
       this.props.order.orderAddresses,
       orderValues,
       this.props.order.exchangeFees,
       this.props.order.v,
       this.props.order.r,
       this.props.order.s
     ).send({
       from: defaultAccount,
       value: Eth.toWei((valor), 'ether'),
       gasLimit: 400000
     })
  }

  handleChangeCurrency(event) {
    const currency = event.target.options[event.target.selectedIndex].text
    const tokenAddress = event.target.value
    const quantity = Eth.toWei(this.props.order.tokenQuantity, 'ether').toString()
    if(0 < quantity){
      fetch(this.generateUrl(this.props.order))
        .then((data) => { return data.json() })
        .then((dataJson) => {
          const order = {
            tokenQuantity: this.props.order.tokenQuantity,
            orderAddresses:dataJson.orderAddresses,
            orderValues:dataJson.orderValues,
            exchanges:dataJson.exchanges,
            exchangeFees:dataJson.exchangeFees,
            v:dataJson.v,
            r:dataJson.r,
            s:dataJson.s
          }
          this.props.handleUpdateState({order, tokenAddress, currency})
        })
      }
  }

  handleChangeAmount(event) {
    if(0 < event.target.value) {
      const order = {...this.props.order, tokenQuantity: event.target.value}
      this.props.handleUpdateState({order})
      fetch(this.generateUrl(order))
        .then((data) => { return data.json() })
        .then((dataJson) => {
          const order = {
            tokenQuantity: this.props.order.tokenQuantity,
            orderAddresses: dataJson.orderAddresses,
            orderValues: dataJson.orderValues,
            exchanges: dataJson.exchanges,
            exchangeFees: dataJson.exchangeFees,
            v: dataJson.v,
            r:dataJson.r,
            s:dataJson.s
          }
          var makerAmount = new Eth.BN(0)
          var takerAmount = new Eth.BN(0)
          dataJson.orderValues.forEach(e => {var b = new Eth.BN(e[0])
             makerAmount.iadd(b)})
          dataJson.orderValues.forEach(e => {var b = new Eth.BN(e[1])
              takerAmount.iadd(b)})
          var price = parseFloat(Eth.fromWei(makerAmount, 'ether'))/parseFloat(Eth.fromWei(takerAmount, 'ether'))
          price = Math.ceil(price*10000000)/10000000
          this.props.handleUpdateState({order, price})
        })
    }
  }

	render() {
		return (
      <div className="alturadelbuy">
        <div style={{marginTop: '22px'}}>
          <span className="ventah2">{ this.props.isBuy ? "Comprar" : "Vender" }</span>
          <div className="genero">
            <div className="generocontent">
              <TokenSelector handleUpdateState={this.props.handleUpdateState} value={this.props.currency} className="tokenSelector"/>
            </div>
          </div>
        </div>
        <div className="margintopcomprar">
          <div className="insideCantidadCompra">
            <div name="limiteurYprogressbar">
              <div name="textos">
                <div name="limitEur">
                  <svg xmlns="http://www.w3.org/2000/svg" width={'16px'} height={'16px'} viewBox="0 0 16 16" style={{paddingTop: '10px', paddingLeft: '0px', paddingRight: '5px', fill: '#9ba6b2'}}>
                    <path d="M12.34 0H1.5C.7 0 0 .7 0 1.5S.7 3 1.5 3h10.84V0zM15 5H0v9c0 1.1.9 2 2 2h13c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1zm-2.5 7c-.8 0-1.5-.7-1.5-1.5S11.7 9 12.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"></path>
                  </svg>
                </div>
                <div className="textosdetextos">
                  <span className="eurtotyquedan">Límite de ETH total</span>
                  <span className="eurtotyquedan paddlefteurotyquedan">Tienes {this.props.balance} ETH </span>
                </div>
              </div>
            </div>
            <div name="inputs" style={{marginTop: '15px'}}>
              <div className="myInputs">
                <input className="insideInput" placeholder="0.00" onChange={this.handleChangeAmount.bind(this)} maxLength="8"/>
                <div className="coptag">
                  { this.props.currency }
                </div>
              </div>
              <div className="arrows" style={{marginTop: '-45px'}}>
                <svg style={{fill: '#9ba6b2'}} xmlns="http://www.w3.org/2000/svg" width={'21px'} height={'22px'} viewBox="0 0 21 22" className="LinkedInput__ExchangeIcon-bhcRJw ibdHOF" ui="[object Object]">
                  <path d="M20 14.8a.8.8 0 1 0 0-1.6H1a.8.8 0 0 0-.58 1.35l6.65 7a.8.8 0 0 0 1.16-1.1L2.86 14.8H20zM1 7.2a.8.8 0 1 0 0 1.6h19a.8.8 0 0 0 .58-1.35l-6.65-7a.8.8 0 1 0-1.16 1.1l5.37 5.65H1z"></path>
                </svg>
              </div>
              <div style={{marginTop: '-48px'}} className="myInputs inputsellbtc">
                <input className="insideInput" value={ (this.props.order.tokenQuantity * this.props.price).toFixed(5) } disabled/>
                <div className="coptag">
                  ETH
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="finalButton" onClick={this.handleFormulario.bind(this)}>{ (this.props.isBuy ? "Comprar" : "Vender") + " " + this.props.currency }</button>
      </div>
			)
	}
}

export default CompraVenta
