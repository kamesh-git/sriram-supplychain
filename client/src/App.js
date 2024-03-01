import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import provider from "./Context/provider";
import Ethprovider from "./Context/provider";
import Navbar from "./Components/Navbar";

class App extends Component {
  state = { loaded: false, cost: 0, itemName: 'Example_1' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();
      //const deployedNetwork = ItemManagerContract.networks[networkId];
      this.itemManager = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[networkId] && ItemManagerContract.networks[networkId].address,
      );

      this.item = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[networkId] && ItemContract.networks[networkId].address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
      console.log(this.itemManager.methods)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handlePayment = async () => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.itemManager);
    let result = await this.itemManager.methods.createItem(itemName, cost).send({ from: this.accounts[0] });
    console.log(result);
    alert("Send " + cost + " Wei to " + result.events.SupplyChainStep.returnValues._address);
  };

  handleSubmit = async () => {
    let result = await this.web3.eth.sendTransaction({ from: this.accounts[0], to: "0x702a65dEd85f780F3ecfB15C44C48743338917Dc", value: 200, gas: 2000000 });
    console.log(result);
    // alert();
  };
  /* handleSubmit = async () => {
  const {cost,itemName} = this.state;
  await this.itemManager.methods.createItem(itemName,cost).send({from:this.accounts[0]});
  } */

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Ethprovider.Provider value={{}}>
        <Navbar />
        <div className="App">
          <h1>Event trigger / Supply Chain Example</h1>
          <h2>Items</h2>
          <h2>Add Items</h2>
          Cost in Wei:<input type='text' name='cost' value={this.state.cost} onChange={this.handleInputChange} /><br></br>
          Item identifier:<input type='text' name='itemName' value={this.state.itemName} onChange={this.handleInputChange} />
          <button type='button' onClick={this.handleSubmit}>pay</button>
          <button type='button' onClick={this.handlePayment}>Create new item</button>
        </div>
      </Ethprovider.Provider>
    );
  }
}

export default App;