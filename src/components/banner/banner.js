import bannerImage from "../images/sample_banner.png"
import arrowLeft from "../images/arrowLeft.png"
import arrowRight from "../images/arrowRight.png"
import play from "../images/play.png"

import './banner.css';

function Banner() {
    return (
        <div>
        
        <div className="bannerContainer1">
            <div className="bannerContainer2">
            <span><img src={arrowLeft}></img></span>
            <span><img id="banner" src={bannerImage}></img></span>
            <span><img src={arrowRight}></img></span>
            </div>

            <div>Lamda Minted his first NFTs</div>
            <div>Lamda - Living as a Kopino</div>
            <img src={play}></img>
        </div>

        </div>
    );
}

export default Banner;