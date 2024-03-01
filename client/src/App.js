import React, {  useEffect, useState } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

export default function App() {
  const [state, setState] = useState({ loaded: false, cost: 0, itemName: 'Example_1' });
  let web3;
  let accounts;
  let networkId;
  let item;
  let itemManager;

  async function init(){
    try {
      // Get network provider and web3 instance.
      web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      networkId = await web3.eth.net.getId();
      //const deployedNetwork = ItemManagerContract.networks[networkId];
      itemManager = new web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[networkId] && ItemManagerContract.networks[networkId].address,
      );

      item = new web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[networkId] && ItemContract.networks[networkId].address,
      );


      console.log(itemManager.methods)
      setState(prev => ({...prev,loaded:true}))
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  useEffect(() => {
    init();
  }, [])

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const json = {}
    json[name] = value

    setState(prev => ({ ...prev, ...json }));
  }

  const handlePayment = async () => {
    const { cost, itemName } = state;
    console.log(itemName, cost, itemManager);
    let result = await itemManager.methods.createItem(itemName, cost).send({ from: accounts[0] });
    console.log(result);
    alert("Send " + cost + " Wei to " + result.events.SupplyChainStep.returnValues._address);
  };

  const handleSubmit = async () => {
  await itemManager.methods.index().call()
  .then(result => {
    console.log("My Number:", result);
  })
  .catch(err => {
    console.error(err);
  });
    // let result = await this.web3.eth.sendTransaction({ from: this.accounts[0], to: "0x702a65dEd85f780F3ecfB15C44C48743338917Dc", value: 200, gas: 2000000 });
    // console.log(result);
  };


  if (!(state.loaded)) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else {
    return <div className="App">
      <h1>Event trigger / Supply Chain Example</h1>
      <h2>Items</h2>
      <h2>Add Items</h2>
      Cost in Wei:<input type='text' name='cost' value={state.cost} onChange={handleInputChange} /><br></br>
      Item identifier:<input type='text' name='itemName' value={state.itemName} onChange={handleInputChange} />
      <button type='button' onClick={handleSubmit}>pay</button>
      <button type='button' onClick={handlePayment}>Create new item</button>
    </div>
  }

}
