import stylesWaitTx from "./waitTx.module.scss";
// import logo from '../images/logo.png';

function WaitTx() {


    return (
        <div className={stylesWaitTx.flexContainer}>
            <div className={stylesWaitTx.loader}>
                <svg viewBox="0 0 80 80">
                    {/* <img src={logo}></img> */}
                    {/* <circle id={stylesWaitTx.test} cx="40" cy="40" r="32"></circle> */}
                </svg>
            </div>
            {/* <div className={`${stylesLoader.loader} ${stylesLoader.triangle}`}>
                <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
            </div>

            <div className={stylesLoader.loader}>
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div> */}
        </div>
    );
}



export default WaitTx;