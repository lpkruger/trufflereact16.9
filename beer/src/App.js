import React, {Component, useEffect, useState} from 'react';
import './App.css';
import BeerFridgeContract from './contracts/BeerFridge.json';
import getWeb3 from './utils/getWeb3.js';

function App() {
  // const web3Instance = set_web3();

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [beer, setBeer] = useState(null);
  //using effect hook to set web3 information

  let accountsInstance;

  async function init_web3() {
     //set web3 provider
     if (!web3) {
       await getWeb3().then(function(result) {setWeb3(result)});
     }
   };

  async function init_accounts() {
    if (accounts) {
      return;
    }
    if (!web3) {
      console.error("too early");
      return;
    }
    //set accounts for function to utilize
    accountsInstance = await web3.eth.getAccounts();
    setAccounts(accountsInstance);
  };

  async function init_contract() {
    if (contract) {
      return;
    }
    if (!web3 || !accounts) {
      console.log("too early");
      return;
    }

    const networkId  = await web3.eth.net.getId();
    console.log("networkId: " + networkId);
    const deployedNetwork = BeerFridgeContract[networkId];
    console.log(BeerFridgeContract);
    window.beerFridgeContract = BeerFridgeContract;
    const address = BeerFridgeContract.networks[Object.keys(BeerFridgeContract.networks)[0]].address;
    console.log(address);
    const beerFridge = new web3.eth.Contract(BeerFridgeContract.abi, address);
    setContract(beerFridge);
  }

  useEffect(() => {
    var display_beer = "unknown";
    if (contract) {
      async function fetch_beers() {
        const contract_beers = await contract.methods.display_beer_ammount().call();
        console.log("Got " + contract_beers + " from contract");
        setBeer(contract_beers);
      }
      fetch_beers();
    }
    if (beer) {
      display_beer = beer;
    }
    // document.querySelector('.App').innerHTML = '<p>hello</p>';
    document.querySelector('.beerAmount').innerHTML = `<p>${display_beer} beers in fridge</p>`;
  })

  init_web3();
  init_accounts();
  init_contract();

  window.contract = contract;
  window.web3 = web3;
  window.accounts = accounts;


  return (
    <div className="App">
      <div className="beerAmount">
      </div>
    </div>
  );
}

export default App;
