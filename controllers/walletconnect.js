const WalletConnectProvider =  require("@walletconnect/web3-provider").default;
const { ethers } = require('ethers');
var QRCode = require('qrcode');
const escrow = require('./escrow');
const web3Config = require('../web3/config');
const Web3 = require('Web3');

//  Create WalletConnect Provider
// const provider = new WCProvider({
//   rpc: {
//     3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//   },
// });
const provider = new WalletConnectProvider({
  infuraId: "e8d2a89e4a0c42c89a2a868ea08bfd16",
  rpc: {
        3: "https://ropsten.infura.io/v3/e8d2a89e4a0c42c89a2a868ea08bfd16",
  },
  bridge : "https://bridge.walletconnect.org"
});
let account;
// get Metamask public Address
const connectMetamaskWallet = async () => {
  console.log("Connecting...")
  try{
    const accounts = await provider.enable()
    console.log(accounts)
    account = accounts[0];
    console.log("acc: " + account);
    return account

  } catch { 
    return error.message;
  }
}
const onSign = async(msg) => {
  try 
  {
    //  Create Web3 instance
    // const web3 = new Web3(provider);
    // if (web3)
    // {
    //   return await web3.eth.personal.sign(msg, account);
    // }
    // const web3Provider = new ethers.providers.Web3Provider(provider);
    // console.log("WEB 3 PROVIDER" + web3Provider)
    // if(web3Provider)
    // {   
    //     console.log("creando contrato...")
    //     const txContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, web3.abi , web3Provider);
    //     const signer = web3Provider.getSigner();
    //     const contractWithSigner = txContract.connect(signer);
    //     console.log("Acoplando contrato con signer...")
    //     const weiValue = ethers.utils.parseEther("0.02");
         
    //     console.log("Sending tx....")
    //     console.log( await contractWithSigner.send("personal_sign", ["Hola"]));
    // }
    provider.request()
  } catch (error) {
    return error
  }
}
module.exports = { provider, connectMetamaskWallet, onSign }