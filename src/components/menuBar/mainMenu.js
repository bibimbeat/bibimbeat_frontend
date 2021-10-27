// import './menuBar.css';
import stylesMainMenu from './mainMenu.module.css';

import { Link } from 'react-router-dom';

function MainMenu() {
    return (
        <div>
            <div className={stylesMainMenu.mainMenu}>
            <Link className="link" style={{ textDecoration: 'none', backgroundColor: 'red', color: 'white', height:'0px' }}to="/"><span>Home</span></Link>
            <Link className="link" style={{ textDecoration: 'none', color: 'white', height:'0px' }}to="/mintNFT"><span>Mint NFT</span></Link>
            <Link className="link" style={{ textDecoration: 'none', color: 'white', height:'0px' }}to="/market"><span>Market</span></Link>

            </div>
        </div>
    );
}

export default MainMenu;