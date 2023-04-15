require('dotenv').config();
const abi  = require ('./abi')
const { ethers } = require('ethers');
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

module.exports = { abi }