import { keccak256 } from "ethereum-cryptography/keccak.js";
import { recoverKey } from "./recoverKey.js"
import { toHex } from "ethereum-cryptography/utils.js";

export function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}


// (async () => {
//     const recoverPublicKey = await recoverKey('Hello there', '304402206885f89fdcb49da8c87cd839ff8cf065b4f6a29f3794e756501d749e1fb51a2002207a090a78190b2b4402aa7725573a30d42da24f7702df2d4e62bd14281040f7bb', 1 );
//     const address = getAddress(recoverPublicKey);
//     console.log(toHex(address));
// })();