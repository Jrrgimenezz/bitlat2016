import React, { Component } from 'react';

import FacturaCompra from './components/FacturaCompra'
import FacturaVenta from './components/FacturaVenta'

class Factura extends Component {
  render() {
    return (<div>{(this.props.tab === 1) ?
    	<FacturaVenta tokenQuantity={this.props.tokenQuantity} fee={this.props.tokenQuantity * this.props.price * this.props.fee}
       price={this.props.price} currency={this.props.currency} this/> :

       <FacturaCompra tokenQuantity={this.props.tokenQuantity} fee={this.props.tokenQuantity * this.props.price * this.props.fee}
        price={this.props.price} currency={this.props.currency} this/>  }</div>);
  }
}

export default Factura;
