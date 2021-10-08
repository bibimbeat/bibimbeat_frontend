import "./market.css"
import img from "../images/market_image.png"  //Follow this and line 12

function Market() {
    return (
        <div>
            <section>
                <div>
                    <div className="musicDescription">
                        <div className="imgGrid">
                            <img src={img} className="img" alt="Broken :("></img>
                        </div>
                        <div className="firstRow">
                            <div>
                                Title
                            </div>
                            <div>
                                Price
                            </div>
                        </div>

                        <div className="firstRowInfo">
                            <div>
                                Kimchi and a Dream
                            </div>
                            <div>
                                1 BBB
                            </div>
                        </div>

                        <div className="secondRow">
                            <div>
                                Artist
                            </div>
                            <div>
                                Genre
                            </div>
                            <div>
                                ID
                            </div>
                        </div>

                        <div className="secondRowInfo">
                            <div>
                                Pico
                            </div>
                            <div>
                                EDM
                            </div>
                            <div>
                                2
                            </div>
                        </div>

                        <div className="thirdRow">
                            Description
                        </div>

                        <div className="thirdRowInfo">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..
                        </div>

                        <div className="fourthRow">
                            External URL
                        </div>

                        <div className="fourthRowInfo">
                            www.pico.ru/kimchiandadream
                        </div>

                        <div className="button">
                            <button className="btn">Buy</button>
                        </div>
                    </div>
                </div>

                <div>

                    <div className="metaData">

                        <div className="item">
                            Item
                        </div>
                        <div className="price">
                            Price
                        </div>

                        <div className="artist">
                            <div>
                                Artist1
                            </div>
                            <div>
                                Artist2
                            </div>
                            <div>
                                Artist3
                            </div>
                            <div>
                                Artist4
                            </div>
                            <div>
                                Artist5
                            </div>
                            <div>
                                Artist6
                            </div>
                            <div>
                                Artist7
                            </div>
                            <div>
                                Artist8
                            </div>
                            <div>
                                Artist9
                            </div>
                            <div>
                                Artist10
                            </div>
                            <div>
                                Artist11
                            </div>
                            <div>
                                Artist12
                            </div>
                            <div>
                                Artist13
                            </div>
                            <div>
                                Artist14
                            </div>

                        </div>
                        <div className="songName">
                            <div>
                                song1
                            </div>
                            <div>
                                Song2
                            </div>
                            <div>
                                Song3
                            </div>
                            <div>
                                song4
                            </div>
                            <div>
                                Song5
                            </div>
                            <div>
                                Song6
                            </div>
                            <div>
                                song7
                            </div>
                            <div>
                                Song8
                            </div>
                            <div>
                                Song9
                            </div>
                            <div>
                                song10
                            </div>
                            <div>
                                Song11
                            </div>
                            <div>
                                Song12
                            </div>
                            <div>
                                song13
                            </div>
                            <div>
                                Song14
                            </div>

                        </div>
                        <div className="prices">
                            <div>
                                1 BBB
                            </div>
                            <div>
                                2 BBB
                            </div>
                            <div>
                                4 BBB
                            </div>
                            <div>
                                2 BBB
                            </div>
                            <div>
                                8 BBB
                            </div>
                            <div>
                                11 BBB
                            </div>
                            <div>
                                1 BBB
                            </div>
                            <div>
                                2 BBB
                            </div>
                            <div>
                                4 BBB
                            </div>
                            <div>
                                2 BBB
                            </div>
                            <div>
                                8 BBB
                            </div>
                            <div>
                                2 BBB
                            </div>
                            <div>
                                8 BBB
                            </div>
                            <div>
                                3 BBB
                            </div>

                        </div>
                        <div className="indent">
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                -
                            </div>
                        </div>
                    </div>
                    <div className="scrollbar">
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Market;