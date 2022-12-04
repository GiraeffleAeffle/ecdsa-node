
const fs = require('fs');
const getAddress = require('./getAddress.js');
const secp =  require('ethereum-cryptography/secp256k1.js');
const signMessage = require('./signMessage.js');
const { toHex } = require("ethereum-cryptography/utils.js");

async function setup() {
    const privateKey = secp.utils.randomPrivateKey();

    const publicKey = secp.getPublicKey(privateKey);

    const address = toHex(getAddress(publicKey));

    const privateKeyAndAddress = {
        "privateKey" : toHex(privateKey),
        "address" : "0x" + address
    }

    fs.writeFile('./privateKeyAndAddress.json', JSON.stringify(privateKeyAndAddress, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    const balance = Math.round(Math.random()*100);

    const addressAndBalance = {
        ["0x"+address] : balance,
    }

    fs.writeFile('./addressAndBalance.json', JSON.stringify(addressAndBalance, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return [privateKey, address];
}

(async () => {
    const [privatekey, address] = await setup()
    const [signature, recoveryBit] =  await signMessage('Hello there', privatekey);
    const base64Signature = Buffer.from(signature).toString('base64');
    console.log("base64 signature: ", base64Signature);
    console.log("recoveryBit: ", recoveryBit);

    const signatureAndRecoveryBit = {
        "address" : "0x"+address,
        "signature": base64Signature,
        "recoveryBit": recoveryBit
    }
    
    fs.writeFile('./signatureAndRecoveryBit.json', JSON.stringify(signatureAndRecoveryBit, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
})();

