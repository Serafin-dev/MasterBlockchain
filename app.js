// Requires
require('dotenv').config();
const express = require('express'); 
const { ethers } = require('ethers');
const escrow = require('./controllers/escrow');
const nodeWalletConnect = require('./controllers/walletconnect_nodeclient');
const walletConnect = require('./controllers/walletconnect');

// app 
const app = express();
app.use(express.json());
// uso middleware bodyParser.urlEncoded so the form values will be on req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// data tx parameter for suscribing
app.get('/susData/:newPlayer', async (req, res) => {

    const { newPlayer } = req.params;
    const data = escrow.subscriptionDataParameter(newPlayer);
    res.status(200).send({
        data,
    });
});

// { "actualAccount":"0xce4Cb342081b7AaF365d82f70ff19Ce8D36F47F3", "newPlayer":"0xce4Cb342081b7AaF365d82f70ff19Ce8D36F47F3" ,"etherAmount" : 2}
// suscribe and become a registered player
app.post('/suscribePlayer', async (req, res) => {
    const { accThatPays } = req.body;
    const { newPlayer } = req.body;
    const { etherAmount } = req.body;

    // suscribe player
    escrow.suscribe(newPlayer, etherAmount);
    
    //response 
    res.status(200).send({
        message: "Suscribing player..."    
    });
});
// data tx parameter for deposits
app.post('/deposit', async (req, res) => {

    const { account } = req.body;
    console.log(account);

    const data = escrow.dataParameter("deposit", account);
    res.status(200).send({
        data,
    });
});
// data tx parameter for deposits
app.get('/witData/:newPlayer', async (req, res) => {

    const { newPlayer } = req.params;
    const data = escrow.withdrawDataParameter(newPlayer);
    res.status(200).send({
        data,
    });
});
app.get('/connectMetamask', async (req, res) => {

    const accounts = await walletConnect.connectMetamaskWallet();
    const account = accounts[0];
    res.status(200).send({
        account,
    });
});
app.get('/sign', async (req, res) => {
    try{
        const result = await walletConnect.onSign("Firmar para Master?");
        res.status(200).send({
            result,
        });
    } catch {
        console.log(error.message);
        res.status(418).send({
            error : error
        });
    }
});
app.get('/sendTx', async (req, res) => {
    try{
        await nodeWalletConnect.sendTx();
        res.status(200).send({
            message: "tx done...",
        });
    } catch {
        res.status(418).send({
            message: error.message,
        });
    }  
});

// // Create product
// app.post('/create_product/:name', async (req, res) => {
    
//     // Request 
//     const { name } = req.params

//     if (!name){
//         res.status(418).send({
//             message : "You need to give the product a name! "
//         });
//     };

//     const backend_Wallet = new ethers.Wallet(process.env.PK, provider);
//     products.createNewProduct(contract, backend_Wallet, name);
    
//     res.send({
//         message:`Product created with name: ${name}`
//     });
// });
// // delegate product
// app.post('/delegate_product/:id', async (req, res) => {
    
//     // Request
//     const { id } = req.params; // product id
//     const from = req.body.owner_pk; // owner private key
//     const to = req.body.new_owner; // newOwner public key
    
//     if(!id || !from || !to){
//         res.status(418).send({
//             message : "Product Id, public key and private key are needed"
//         });
//     };
//     // Owner Wallet
//     const Wallet = new ethers.Wallet(from, provider) // sender Wallet
//     products.delegateProduct(contract, id, Wallet, to)

//     res.send({
//         message : `Product succesfully delegated to ${to}`
//     });

// });

// // Accept Product
// app.post('/accept_product/:id', async (req, res) => {
    
//     // Request
//     const { id } = req.params //product id
//     const pk  = req.body.pk // newOwner private key

//     // Check params
//     if (!pk || !id){
//         res.status(418).send({
//             message : " ¡A private Key and an id are needed! "
//         });
//     };

//     const Wallet = new ethers.Wallet(pk, provider) // sender Wallet
//     products.acceptProduct(contract, id, Wallet)
    
//     //response 
//     res.send({
//         message : `Product accepted with id:${id}`
//     });
// });
// //0x61BB5BAA4ED7Ff7Ac86BFb7cAcbB29c7e5EC8678
// // Read Products from owner
// app.get('/owner_products/:owner', async (req, res) => {
    
//     const { owner } = req.params;// public key
    
//     // Ckeck params
//     if (!owner){
//         res.status('418').send({
//             message: "A public Key is needed"
//         });
//     };
    
//     const products_from_owner = await products.getProductsFromOwner(contract, owner);
    
//     //response 
//     res.status('200').send({
//         products_from_owner
//     });
// });

module.exports = app;