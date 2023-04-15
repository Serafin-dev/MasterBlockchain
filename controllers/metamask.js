const { ethers } = require('ethers');
const { web3 } = require ('../web3/config')
// esta fue sacada de la documentación de metamask
// function connect() {
//     ethereum
//       .request({ method: 'eth_requestAccounts' })
//       .then(handleAccountsChanged)
//       .catch((err) => {
//         if (err.code === 4001) {
//           // EIP-1193 userRejectedRequest error
//           // If this happens, the user rejected the connection request.
//           console.log('Please connect to MetaMask.');
//         } else {
//           console.error(err);
//         }
//       });
// }
// returns an rpc metamask signer. 
function connect() {
    ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((currentAccount) => {
            return currentAccount[0];
        })
        .catch((err) => {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
    });
}
// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
    }
}
const getAccount = async () => {
    try {
        let account = ethereum.request({method: 'eth_accounts'})
        return account
    } catch (error) {
        console.log(error.message);
    }
}
// prompt metamask connection function. 
const loadWeb3Acc = async () => {
    //access the user's Ethereum account(s)".
    let accounts = await web3.provider.send("eth_requestAccounts");
    let currentAccount = accounts[0];
   
    return currentAccount;
}

module.exports = {loadWeb3Acc}