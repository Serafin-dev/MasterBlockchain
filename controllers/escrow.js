
require('dotenv').config();
const { ethers } = require("ethers");
const abi = require("../web3/abi");
const web3 = require('../web3/config');

// 'data' parameter Unity needs for onSendTransaction() from Chainsafe SDK.
const subscriptionDataParameter = (newPlayer) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.encodeFunctionData("paySubscription", [newPlayer]);
}
const depositDataParameter = (player) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.encodeFunctionData("deposit", [player]);
}
const withdrawDataParameter = (player) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.encodeFunctionData("withdraw", [player]);
}
const dataParameter = (method, value) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.encodeFunctionData(method, [value]);
}
// Esta función debe ser ejecutada por un JsonRpcSigner, o sea una cuenta de Metamask.
// Para obtenerlo debemos ejecutar getSigner() de ether.js
// a Signer from MetaMask can send transactions and sign messages but cannot sign a transaction (without broadcasting it).
const suscribe = async (accThatPays, newPlayer, etherAmount) => {
    // Event Listener
    web3.contract.once("Deposited", (payee, weiAmount) => {
        console.log({
            "message":"Suscription succesfull",
            "payee": payee,
            "wei amount": weiAmount
        })
    });
    // conectar el contrato con rpcSigner
    const contractWithWallet = web3.contract.connect(web3.signer);
    const options = {
        from: accThatPays,
        to: process.env.CONTRACT_ADDRESS,
        value: ether.utils.parseEther(etherAmount.toString())
    } 
    contractWithWallet.paySubscription(newPlayer, options);
}
// In order to play 
const paySubscription = async (newPlayer, amount) => {
    console.log("Comenzando suscripción...");
    //set interface
    // const iface = ["function paySubscription(address account) payable"]
    const iface = new ethers.utils.Interface(abi);
    const price = ethers.utils.parseEther(amount);
    
    //get actual active Account
    let accountThatPays = newPlayer;	   
    
    console.log("Configuro Parametros");
    //set up Ethereum/Binance transaction
    const transactionParameters = {
		from: accountThatPays,
        to: process.env.CONTRACT_ADDRESS,
        value: price.toString(),
		'data': iface.encodeFunctionData("depositsOf", [newPlayer])
    };
	console.log("PASO LOS PARAMETROS");
    //sign transaction via Metamask
    try {
        const txHash = await web3Provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
        });
        return {
            success: true,
            status: "✅ Mirá tu transacción en Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Algo salió mal " + error.message
        }
    }
}
// deposit - payable
const deposit = async (player, amount) => { 
    web3.contract.once("Deposited", (payee, weiAmount) => {
        console.log({
            "message":"Deposit succesfull",
            "payee": payee, 
            "wei amount": weiAmount,
        })
    });
    // conectar el contrato con una wallet
    const contractWithWallet = web3.contract.connect(web3.signer);
    contractWithWallet.deposit(player, {
        value: ether.utils.parseEther(toString(amount))
    });
}
const withdraw = async (account) => {
    // Event Listener 
    web3.contract.once("Withdrawn", (payee, weiAmount) => {
        console.log({
            "message":"Withdrawn succesfull",
            "payee": payee, 
            "wei amount": weiAmount,
        })
    }); 
    // conectar el contrato con una wallet
    const contractWithWallet = web3.contract.connect(web3.signer);
    contractWithWallet.withdraw(account);
}
// release the payment of Master share holders
const releasePayment = async (account) => {
	//set interface
    const iface = new ethers.utils.Interface(abi);
	//get actual active Account
	let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    let actualAccount = accounts[0];	   

    //set up your Ethereum/binance transaction
    const transactionParameters = {
		from: actualAccount,
		to: contractAddress,
		'data': iface.encodeFunctionData("release"),
    };
	console.log("PASO LOS PARAMETROS");
    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
        });
        return {
            success: true,
            status: "✅ Mirá tu transacción en Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Algo salió mal " + error.message
        }
    }
}
// OWNABLE
// masterWallet es nuestra cuenta admin
const transferOwnership = async (newOwner) => {
    // conectar el contrato con una wallet
    const masterWallet = new ethers.Wallet(process.env.PK, web3.provider);
    const contractWithWallet = web3.contract.connect(masterWallet);
    contractWithWallet.transferOwnership(newOwner);
}
const contractOwner = async () => {
    return await web3.contract.owner();
}
const gamePrice = async () => {
    return await web3.contract.gamePrice();
}
const depositsOfAcc = async (account) => {
    let deposits = await web3.contract.depositsOf(account);
    return deposits
}
// newValue must be ether
const changeGamePrice = async (newValue) => {
    const masterWallet = new ethers.Wallet(process.env.PK, provider);
    const contractWithWallet = web3.contract.connect(masterWallet);
    contractWithWallet.changeGamePrice(newValue);
}
const masterReleased = async (payee) => {
    let releasedToPayee = await web3.contract.masterReleased(payee);
    return releasedToPayee
}
const masterTotalReleased = async () => {
    let totalReleased = await web3.contract.masterTotalReleased();
    return totalReleased
}
const getPayee = async (index) => {
    let payee = await web3.contract.payee(index);
    return payee
}
const getShares = async (payee) => {
    return web3.contract.shares(payee);
}
const getTotalShares = async () => {
    return web3.contract.totalShares();
}

module.exports = { suscribe, paySubscription, deposit, withdraw, releasePayment, transferOwnership, contractOwner, gamePrice, depositsOfAcc , changeGamePrice, masterReleased, masterTotalReleased, getPayee, getShares, getTotalShares, dataParameter, subscriptionDataParameter, depositDataParameter, withdrawDataParameter};