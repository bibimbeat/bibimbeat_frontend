import ConnectWallet from './connectWallet';
import BibimbeatLogo from './logo';
import MainMenu from './mainMenu';
import MyMusic from './myMusic';
import DotMenu from './dotMenu';
import stylesMenuBar from './menuBar.module.css';

function MenuBar() {
    return (
    <nav>
        <div className={stylesMenuBar.flexContainer}>
            <div className={stylesMenuBar.logoMenuBar}><BibimbeatLogo /></div>
            <div className={stylesMenuBar.mainMenuMenuBar}><MainMenu /></div>
            <div className={stylesMenuBar.myMusicMenuBar}>
            
            </div>
            <div className={stylesMenuBar.connectWalletMenuBar}>
            <MyMusic />
            <ConnectWallet />
            <DotMenu />
            </div>
   
        </div>

    </nav>
    );
  }


  export default MenuBar;