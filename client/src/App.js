import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Ethprovider from "./Context/provider";
import HomeScreen from "./Components/HomeScreen";

class App extends Component {
  state = { loaded: false, cost: 0, itemName: 'Example_1',items : [] };

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

      this.setState({ loaded: true });
      this.getItems();
      console.log(this.itemManager)
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  getItems = async () => {
    const index = await this.itemManager.methods.index().call();
    const items = []
    for(let i = 0 ;i < index ; i++){
      const item = await this.itemManager.methods.items(parseInt(i)).call();
      items.push(item);

    }
    this.setState({items:items});

    
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleCreate = async (itemName,cost) => {
    console.log(itemName, cost, this.itemManager);
    let result = await this.itemManager.methods.createItem(itemName, cost).send({ from: this.accounts[0] });
    console.log(result);
    alert("Send " + cost + " Wei to " + result.events.SupplyChainStep.returnValues._address);
    this.getItems();
  };

  handleDeliver = async (index) => {
    let result = await this.itemManager.methods.triggerDelivery(index).send({ from: this.accounts[0] });
    console.log(result);
    alert("Item delivery Triggered");
    this.getItems();
  };

  handlePayment = async (address,amount) => {
    let result = await this.web3.eth.sendTransaction({ from: this.accounts[0], to: address, value: amount, gas: 2000000 });
    console.log(result);
    this.getItems();
  };


  render() {
    return (
      <Ethprovider.Provider value={{loaded:this.state.loaded,items:this.state.items,handlePayment:this.handlePayment,handleCreate:this.handleCreate,handleDeliver:this.handleDeliver}}>
        <HomeScreen />
      </Ethprovider.Provider>
    );
  }
}

export default App;