import bannerImage from "../images/sample_banner.png"
import arrowLeft from "../images/arrowLeft.png"
import arrowRight from "../images/arrowRight.png"
import play from "../images/play.png"

import stylesBanner from './banner.module.css';

function Banner() {
    return (
        <div>
        
        <div className={stylesBanner.bannerContainer1}>
            <div className={stylesBanner.bannerContainer2}>
            <span className={stylesBanner.arrowLeft}><img src={arrowLeft} alt={arrowLeft}></img></span>
            <span><img id={stylesBanner.banner} src={bannerImage} alt={bannerImage}></img></span>
            <span className={stylesBanner.arrowRight}><img src={arrowRight} alt={arrowRight}></img></span>
            </div>

            <div className={stylesBanner.title}>Lamda Minted his first NFTs</div>
            <div className={stylesBanner.songPlay}>
            <div className={stylesBanner.song}>Lamda - Living as a Kopino</div>
            <img className={stylesBanner.play} src={play} alt={play}></img>

            </div>
        </div>

        </div>
    );
}

export default Banner;