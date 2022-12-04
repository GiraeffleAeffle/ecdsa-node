import {recoverPublicKey} from "ethereum-cryptography/secp256k1.js";
import {hashMessage}  from "./hashMessage.js";

export async function recoverKey(message, signature, recoveryBit) {
    const recoveredPublicKey = recoverPublicKey(hashMessage(message), signature, recoveryBit);
    return recoveredPublicKey;
}