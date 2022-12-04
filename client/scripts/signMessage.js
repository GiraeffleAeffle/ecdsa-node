import secp from "ethereum-cryptography/secp256k1.js";
import { hashMessage } from './hashMessage.js';

export async function signMessage(msg, privateKey) {
    return await secp.sign(hashMessage(msg), privateKey, {"recovered": true });
}