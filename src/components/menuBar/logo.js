import logo from '../images/logo.png';
// import './menuBar.css';
import stylesLogo from './logo.module.css';


function BibimbeatLogo() {
    return (
        <div>
            <div className={stylesLogo.flexContainerLogo}>
                <img id={stylesLogo.logo} src={logo} alt={logo}></img>
                <div className={stylesLogo.flexContainerLogo2}>
                    <div>Bibimbeat</div>
                    <div>Music NFT Market</div>
                </div>
            </div>

        </div>
    );
}

export default BibimbeatLogo;