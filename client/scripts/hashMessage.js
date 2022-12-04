import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";

export function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}
