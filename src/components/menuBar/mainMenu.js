// import './menuBar.css';
import stylesMainMenu from './mainMenu.module.css';

import { Link } from 'react-router-dom';

function MainMenu() {
    return (
        <div>
            <div className={stylesMainMenu.mainMenu}>
            <Link style={{ textDecoration: 'none', color: 'white', height:'0px' }}to="/"><span className={stylesMainMenu.home}>Home</span></Link>
            <Link style={{ textDecoration: 'none', color: 'white', height:'0px' }}to="/mintNFT"><span className={stylesMainMenu.mintNFT}>Mint NFT</span></Link>
            <Link style={{ textDecoration: 'none', color: 'white', height:'0px' }}to="/market"><span className={stylesMainMenu.market}>Market</span></Link>

            </div>
        </div>
    );
}

export default MainMenu;