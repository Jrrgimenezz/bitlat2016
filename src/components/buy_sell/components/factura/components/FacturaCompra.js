import React, { Component } from 'react';
import buysellcircled from '../../../../../images/buysellcircled.png';

class FacturaCompra extends Component {
  render() {
    return (<div className="wholebill1">
      <div className="compratop">
        <div className="headercompratop">
          <div className="mybtclogo">
            <div style={{marginTop: '-4%', marginLeft: '7%'}}>
              <img alt='bitlat' src={buysellcircled} width={'80%'} height={'80%'} />
            </div>
          </div>
          <span className="operacionbilltext" >Operación de compra</span>
        </div>

        <div className="margintopbillnumber">
          <span className="billnumber" >{ this.props.tokenQuantity } <span className="btctext">{ this.props.currency }</span></span>
        </div>

        <div className="margintoppreciobuysell">
          <span className="preciobuysell" >a { this.props.price.toFixed(4)} ETH por { this.props.currency }</span>
        </div>
      </div>

      <div className="comprabottom">

        <div style={{display: 'flex', marginTop: '23px'}}>
          <div className="margintopbtcbill">
            <span className="aspectobtcbill" >{ this.props.tokenQuantity } { this.props.currency }</span>
          </div>
          <div className="margintopbtcbill marginpoints" style={{marginLeft: '50%'}}>
            <span className="aspectobtcbill" >{ (this.props.tokenQuantity*this.props.price).toFixed(4) } ETH</span>
          </div>
        </div>

        <div style={{display: 'flex', marginTop: '0px'}}>
          <div className="margintopbtcbill"><span className="aspectobtcbill">Fee</span></div>
          <div className="separacionpuntosfeebill bPDeSX"></div>
          <div className="margintopbtcbill marginpoints"><span className="aspectobtcbill">{ this.props.fee.toFixed(4) } ETH</span></div>
        </div>

        <div style={{display: 'flex'}}>
          <div className="margintopbtcbill"><span className="aspectobtcbill" style={{color: '#f44336'}}>Total</span></div>
          <div className="margintopbtcbill marginpoints" style={{marginLeft: '50%'}}>
            <span className="aspectobtcbillred" >{ ((this.props.tokenQuantity*this.props.price) + this.props.fee).toFixed(4) } ETH</span>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default FacturaCompra
