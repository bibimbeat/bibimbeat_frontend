import stylesWalletNC from "./walletNotConnected.module.css";

function WalletNotConnected() {
    return (
        <div className={stylesWalletNC.container}>
            <div className={stylesWalletNC.alert}>Please connect to your wallet</div>
        </div>
    );
}

export default WalletNotConnected;