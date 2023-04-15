// const WalletConnect = require("@walletconnect/client").default;
// require('dotenv').config();
// const { ethers } = require('ethers');
// const QRCodeModal =  require("@walletconnect/qrcode-modal");
// const escrow = require('./escrow');
// // var QRCode = require('qrcode');


// // Create a connector
// const connector = new WalletConnect({
//   bridge: "https://bridge.walletconnect.org", // Required
//   qrcodeModal: QRCodeModal,
// });

// // Check if connection is already established
// if (!connector.connected) {
//   // create new session
//   connector.createSession();
// }

// // Subscribe to connection events
// connector.on("connect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get provided accounts and chainId
//   const { accounts, chainId } = payload.params[0];
//   console.log(accounts);
// });

// connector.on("session_update", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get updated accounts and chainId
//   const { accounts, chainId } = payload.params[0];
// });

// connector.on("disconnect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Delete connector
// });
// // Sign transaction
// const sendTx = async () => {
//     if (connector.accounts){
//         const playerAddress = connector.accounts[0];
//         console.log("Setting tx for " + playerAddress);
//         const tx = {
//             from: playerAddress, // Required
//             to: process.env.CONTRACT_ADDRESS, // Required (for non contract deployments)
//             data: "", // Required
//             gasPrice: "", // Optional
//             gas: "", // Optional
//             value: ethers.utils.parseEther("0.01"), // Optional
//             nonce: "", // Optional
//         };
//         connector
//         .sendTransaction(tx)
//         .then((result) => {
//             // Returns signed transaction
//             return result
//         })
//         .catch((error) => {
//             // Error returned when rejected
//             return error
//         });
//     }
// }
// module.exports = { sendTx, connector }