import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CompraVenta from './CompraVenta'

class Formulario extends Component {

  handleTab(state) {
    this.props.handleUpdateState({tab: state});
  }

  render() {
    return (
      <div className="mypage1">
        <div className="wholebuysell1">
          <Tabs className="tabs">
            <TabList style={{display: 'flex', flexDirection: 'row'}}>
                <Tab onClick={this.handleTab.bind(this, 0)}>Comprar</Tab>
                <Tab onClick={this.handleTab.bind(this, 1)}>Vender</Tab>
            </TabList>
            <TabPanel>
              <CompraVenta isBuy={true} order={this.props.order} handleUpdateState={this.props.handleUpdateState}
              currency={this.props.currency} balance={this.props.balance} account={this.props.account}
              tokenAddress={this.props.tokenAddress}  price={this.props.price}  contractInstance={this.props.contractInstance}
              web3={this.props.web3}/>
            </TabPanel>
            <TabPanel>
              <CompraVenta isBuy={false} order={this.props.order} handleUpdateState={this.props.handleUpdateState} contractInstance={this.props.contractInstance}
              currency={this.props.currency} balance={this.props.balance} price={this.props.price} tokenAddress= {this.props.tokenAddress} account={this.props.account}/>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      )
  }
}

export default Formulario
