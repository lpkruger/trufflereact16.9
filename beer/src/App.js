import React, {Component, useEffect, useState} from 'react';
import './App.css';
import BeerFridgeContract from './contracts/BeerFridge.json';
import getWeb3 from './utils/getWeb3.js';

function App() {
  // const web3Instance = set_web3();

  const [web3, setWeb3] = useState(null);
  const [beer, setBeer] = useState(3);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  //using effect hook to set web3 information

  let accountsInstance;

  async function set_web3() {
      //set web3 provider
     await getWeb3().then(function(result) {setWeb3(result)});
   };

  async function set_accounts() {
    set_web3();
    //set accounts for function to utilize
    // accountsInstance = await web3.eth.getAccounts();
    // setAccounts(accountsInstance);
  };

  async function set_contract() {
    const networkId  = await web3.eth.net.getId();
    const deployedNetwork = BeerFridgeContract[networkId];
    console.log('beerfridge');
    const beerFridge = web3.eth.Contract(BeerFridgeContract.abi, deployedNetwork && deployedNetwork.address,);
    setContract(beerFridge);
  }


  // set_web3();
  set_accounts();

  useEffect(() => {
    // document.querySelector('.App').innerHTML = '<p>hello</p>';
    document.querySelector('.beerAmmount').innerHTML = `<p>${beer} beers in fridge</p>`;
  })

  return (
    <div className="App">
      <div className="beerAmmount">
      </div>
    </div>
  );
}

export default App;
