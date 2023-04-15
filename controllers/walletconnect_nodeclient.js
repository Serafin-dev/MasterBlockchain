// require('dotenv').config();
// const { ethers } = require('ethers');
// const NodeWalletConnect =  require ("@walletconnect/node").default;
// const WalletConnectQRCodeModal =  require("@walletconnect/qrcode-modal");
// const escrow = require('./escrow');
// // var QRCode = require('qrcode');

 
//  // Create connector
// const walletConnector = new NodeWalletConnect(
//     {
//         bridge: "https://bridge.walletconnect.org", // Required
//     },
//     {
//         clientMeta: {
//         description: "Master Client",
//         url: "http://45.178.98.17:8181",
//         icons: ["https://nodejs.org/static/images/logo.svg"],
//         name: "Master",
//         },
//     }
// );
// // Check if connection is already established
// if (!walletConnector.connected) {
//     // create new session
//     walletConnector.createSession()
//     .then(() => {
//         console.log("Session initiated...");
//         // get uri for QR Code modal
//         const uri = walletConnector.uri;
//         // display QR Code modal
//         console.log("Opening QrCode...");
//         WalletConnectQRCodeModal.open(uri,() => {
//             console.log("QR Code Modal closed");
//         },
//         true // isNode = true
//         );
//     });
// }
// // Subscribe to connection events
// walletConnector.on("connect", (error, payload) => {
//     if (error) {
//       throw error;
//     }
  
//     // Close QR Code Modal
//     WalletConnectQRCodeModal.close(
//       true // isNode = true
//     );
  
//     // Get provided accounts and chainId
//     const { accounts, chainId } = payload.params[0];
//     console.log(accounts[0]);
//     console.log(walletConnector.accounts);
// });
  
// walletConnector.on("session_update", (error, payload) => {
//     if (error) {
//       throw error;
//     }
  
//     // Get updated accounts and chainId
//     const { accounts, chainId } = payload.params[0];
//     console.log(accounts[0]);
// });
  
// walletConnector.on("disconnect", (error, payload) => {
//     if (error) {
//       throw error;
// }
  
//     // Delete walletConnector
// });
  
// // send transaction
// const sendTx = async () => {
//     if (walletConnector.accounts){
//         const playerAddress = walletConnector.accounts[0];
//         const txParams = {
//             from: playerAddress, // Required
//             to: "0xce4cb342081b7aaf365d82f70ff19ce8d36f47f3", // Required (for non contract deployments)
//             data: "", // Required
//             gasPrice: "", // Optional
//             gas: "", // Optional
//             value: ethers.utils.parseEther("0.01"), // Optional
//             nonce: "", // Optional
//         };
//         console.log("sending tx...")
//         return await walletConnector.sendTransaction(txParams);   
//     }
// }
// module.exports = { sendTx }

