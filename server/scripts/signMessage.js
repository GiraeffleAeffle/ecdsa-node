const secp = require("ethereum-cryptography/secp256k1.js");
const hashMessage = require('./hashMessage.js');

async function signMessage(msg, privateKey) {
    return await secp.sign(hashMessage(msg), privateKey, {"recovered": true });
}

module.exports = signMessage;