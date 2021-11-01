// import './menuBar.css';
import stylesConnectWallet from './connectWallet.module.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function ConnectWallet() {
    const [ButtonText, setButtonText] = useState("Connect Wallet");

    const createShortAddress = (address) => {
        return address.slice(0, 6) + "..." + address.slice(address.length - 4, address.length);
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const network = await provider.getNetwork();
            if (network.chainId !== 421611) {
                setButtonText("Wrong Network");
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x66EEB' }], // chainId must be in hexadecimal numbers
                  });
                setButtonText(createShortAddress(accounts[0]));
            }
            else {
                sessionStorage.setItem('currentAccount', accounts[0]);
                setButtonText(createShortAddress(accounts[0]));
            }
        }
    }

    useEffect(() => {
        const reload = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            if (await window.ethereum._metamask.isUnlocked()) {
                if ((await provider.getNetwork()).chainId !== 421611) {
                    console.log("not arbi1111!");
                    setButtonText("Wrong Network");
                }
                else {
                    const accountFromSession = sessionStorage.getItem("currentAccount");
                    if (accountFromSession)
                        setButtonText(createShortAddress(accountFromSession));
                }
            }
        }
        window.ethereum.on('chainChanged', async (chainId) => {
            console.log(chainId)
            if (chainId !== "0x66eeb") {
                console.log("not arbi!");
                setButtonText("Wrong Network");
            }
            else {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                sessionStorage.setItem('currentAccount', accounts[0]);
                setButtonText(createShortAddress(accounts[0]));
            }
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            // window.location.reload();
          });
        window.ethereum.on('accountsChanged', accounts => {
            if (accounts) {
                sessionStorage.setItem('currentAccount', accounts[0]);
                setButtonText(createShortAddress(accounts[0]));
            }
        });
        reload();
    }, [])
    return (
        <div>
            <div>
                <div id={stylesConnectWallet.connectWallet} onClick={connectWallet}>
                    <span>{ButtonText}</span>
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;