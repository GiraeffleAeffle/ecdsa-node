import server from "./server";
import {recoverKey} from "../scripts/recoverKey.js";
import {getAddress} from "../scripts/getAddress.js";
import {Buffer} from 'buffer';
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ signature, setSignature, balance, setBalance, recoveryBit, setRecoveryBit, address, setAddress }) {
  
  async function handleSignature(evt) {
    const signature = evt.target.value.replace(/\s/g, "");
    setSignature(signature);
  }

  async function handleRecoveryBit(evt) {
    const recoveryBit = Number(evt.target.value.replace(/\s/g, ""));
    setRecoveryBit(recoveryBit);
  }

  async function onClick(){
    const message = 'Hello there';
    const uint8ArraySignature =  new Uint8Array(Buffer.from(signature, 'base64'));
    const recoverPublicKey = await recoverKey(message, uint8ArraySignature, recoveryBit);
    const address = '0x'+ toHex(getAddress(recoverPublicKey));

    if (address) {
      setAddress(address);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Sign the message 'Hello there' and put in the signature here in base64 format so we can confirm that you are the owner of the wallet." value={signature} onChange={handleSignature}></input>
      </label>
      <label>
        Recovery Bit
        <input placeholder="Put in the recoveryBit" value={recoveryBit} onChange={handleRecoveryBit}></input>
      </label>
      <button onClick={onClick}>
        Send
      </button>
      <label> Your Address
      <input type='text' required={true} disabled={true} value={address}/>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
