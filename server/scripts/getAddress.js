const {keccak256} = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}

module.exports = getAddress;