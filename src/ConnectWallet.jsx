import React, { useContext } from 'react';
import { connectToMetamask } from './services/metamaskService.js';
import { GlobalAppContext } from './App';
import './styles/ConnectWallet.css';

export default function ConnectWallet() {
    // use the GlobalAppContext to keep track of the metamask account connection
    const { metamaskAccountAddress, setMetamaskAccountAddress } = useContext(GlobalAppContext);

    const retrieveWalletAddress = async () => {
        const addresses = await connectToMetamask();
        if (addresses) {
          // grab the first wallet address
          setMetamaskAccountAddress(addresses[0]);
          console.log(addresses[0]);
        }
      }

     return (
        <button className="connect-wallet-button"
            onClick={retrieveWalletAddress}
        >
            {metamaskAccountAddress === "" ?
                "Connect Wallet" :
                `${metamaskAccountAddress.substring(0, 8)}...`}
        </button>
     )
}