import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MusicFactory from '../../abi/MusicFactory.json';
import MusicMarket from '../../abi/MusicMarket.json';
import addresses from '../../environment/ContractAddress.json';
import axios from 'axios';
import stylesMyMusicList from './myMusicList.module.css';
import { useDispatch } from 'react-redux';
import { onChangeMusic } from './../../redux/modules/playButton';
import Loader from '../loader/loader';

function MyMusicList() {
    const dispatch = useDispatch();

    const [Images, setImages] = useState([]);
    const [Titles, setTitles] = useState([]);
    const [Artists, setArtists] = useState([]);
    const [Genre, setGenre] = useState([]);
    const [TokenIDs, setTokenIDs] = useState([]);
    const [Descriptions, setDescriptions] = useState([]);
    const [ExternalURLs, setExternalURLs] = useState([]);
    const [Songs, setSongs] = useState([]);
    const [Amounts, setAmounts] = useState([]);
    const [CreatorAddresses, setCreatorAddresses] = useState([]);

    const [SelectedImage, setSelectedImage] = useState();
    const [SelectedTitle, setSelectedTitle] = useState();
    const [SelectedArtist, setSelectedArtist] = useState();
    const [SelectedGenre, setSelectedGenre] = useState();
    const [SelectedTokenID, setSelectedTokenID] = useState();
    const [SelectedDescription, setSelectedDescription] = useState();
    const [SelectedExternalURL, setSelectedExternalURL] = useState();
    const [SelectedAmount, setSelectedAmount] = useState();
    const [SelectedSong, setSelectedSong] = useState();
    const [SelectedCreatorAddress, setSelectedCreatorAddress] = useState();

    const [SellButtonText, setSellButtonText] = useState("Sell");
    const [IsInputVisible, setIsInputVisible] = useState("hidden");

    const [Price, setPrice] = useState();
    const [AmountToSell, setAmountToSell] = useState();

    const [IsDataRead, setIsDataRead] = useState(false);

    const putSongInfo = (i) => {
        setSelectedTokenID(TokenIDs[i]);
        setSelectedAmount(Amounts[i]);
        setSelectedTitle(Titles[i]);
        setSelectedArtist(Artists[i]);
        setSelectedGenre(Genre[i]);
        setSelectedDescription(Descriptions[i]);
        setSelectedExternalURL(ExternalURLs[i]);
        setSelectedImage(Images[i]);
        setSelectedSong(Songs[i]);
        setSelectedCreatorAddress(CreatorAddresses[i]);
    }

    const clickPlayButton = () => {
        const currentSongData = {
            musicUrl: SelectedSong,
            artist: SelectedArtist,
            title: SelectedTitle
        }
        dispatch(onChangeMusic(currentSongData));
    }

    const initializeStates = () => {
        setTokenIDs([]);
        setAmounts([]);
        setTitles([]);
        setArtists([]);
        setGenre([]);
        setDescriptions([]);
        setExternalURLs([]);
        setImages([]);
        setSongs([]);
        setCreatorAddresses([]);
    }

    useEffect(() => {
        const renderNFTList = async () => {
            initializeStates();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            if (network.chainId === 421611) {
                const listAccounts = await provider.listAccounts();
                if (listAccounts.length) {
                    const signer = await provider.getSigner();
                    const musicFactory = new ethers.Contract(addresses.musicFactory, MusicFactory.abi, signer);
                    const address = await signer.getAddress();
                    const tokenLengthHex = await musicFactory.tokenId();
                    const tokenLength = parseInt(tokenLengthHex._hex);
                    const addressArray = Array(tokenLength).fill(address);
                    const tokenArray = [...Array(tokenLength)].map((_, i) => i + 1);

                    let tokenIDList = [];
                    let tokenAmountList = [];

                    (await musicFactory.balanceOfBatch(addressArray, tokenArray)).map((res, tokenID) => {
                        res = parseInt(res._hex);
                        if (res !== 0) {
                            tokenIDList.push(tokenID + 1);
                            tokenAmountList.push(res);
                        }
                        return res;
                    });

                    setTokenIDs(tokenIDList);
                    setAmounts(tokenAmountList);

                    await tokenIDList.reduce(async (prevPromise, res, index) => {
                        await prevPromise;
                        const uri = await musicFactory.getTokenURI(res);
                        var hex = uri.toString();
                        var str = "";
                        for (var n = 2; n < hex.length; n += 2) {
                            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
                        }
                        const gatewayUri = getGatewayAddress(str);
                        const result = await axios.get(gatewayUri);

                        const metadata = result.data;
                        const image_url = getGatewayAddress(subIPFS(metadata.image));
                        const music_url = getGatewayAddress(subIPFS(metadata.animation_url));

                        // adds metadata
                        setTitles(prevArr => [...prevArr, metadata.name]);
                        setArtists(prevArr => [...prevArr, metadata.artist]);
                        setGenre(prevArr => [...prevArr, metadata.genre]);
                        setDescriptions(prevArr => [...prevArr, metadata.description]);
                        setExternalURLs(prevArr => [...prevArr, metadata.external_url]);
                        setImages(prevArr => [...prevArr, image_url]);
                        setSongs(prevArr => [...prevArr, music_url]);
                        setCreatorAddresses(prevArr => [...prevArr, metadata.creatorAddress]);

                        if (index === 0) { // adds initial data
                            setSelectedTokenID(tokenIDList[0]);
                            setSelectedAmount(tokenAmountList[0]);
                            setSelectedTitle(metadata.name);
                            setSelectedArtist(metadata.artist);
                            setSelectedGenre(metadata.genre);
                            setSelectedDescription(metadata.description);
                            setSelectedExternalURL(metadata.external_url);
                            setSelectedImage(image_url);
                            setSelectedSong(music_url);
                            setSelectedCreatorAddress(metadata.creatorAddress);
                        }
                    }, Promise.resolve());
                    setIsDataRead(true);
                }
            }
        }

        renderNFTList();
        window.ethereum.on('accountsChanged', () => {
            setIsDataRead(false);
            renderNFTList();
        });
    }, []);

    const getGatewayAddress = (cid) => {
        var gatewayAddress = "https://ipfs.io/ipfs/" + cid
        return gatewayAddress;
    }
    const subIPFS = (str) => {
        return str.slice(7);
    }

    const clickSellButton = () => {
        setSellButtonText("Approve");
    }

    const clickApproveButton = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const musicFactory = new ethers.Contract(addresses.musicFactory, MusicFactory.abi, signer);
            const account = await signer.getAddress();
            if (!(await musicFactory.isApprovedForAll(account, addresses.musicMarket))) {
                const tx = await musicFactory.setApprovalForAll(addresses.musicMarket, true);
                await tx.wait();
                window.alert("your token has been approved to smart contract.");
            }
            setSellButtonText("Add on tradeblock");
            setIsInputVisible("visible");
        }
        catch (err) {
            console.log(err);
        }
    }

    const clickAddOnTradeblock = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const musicMarket = new ethers.Contract(addresses.musicMarket, MusicMarket.abi, signer);
        const tx = await musicMarket.openTrade(SelectedCreatorAddress, SelectedTokenID, Price, AmountToSell);
        await tx.wait();
        window.alert("your NFT has been uploaded on tradeblock!");
        window.location.reload();
    }

    const putPrice = (e) => {
        if (e.target.value) {
            const price = ethers.utils.parseEther(e.target.value); // * 18
            setPrice(price);
        }
        else {
            setPrice(0);
        }
    }

    const putAmountToSell = (e) => {
        if (e.target.value > SelectedAmount) {
            window.alert("the amount you want to sell exceeds total amount of NFT. Please Try again.")
            e.target.value = SelectedAmount;
            setAmountToSell(e.target.value);
        }
        else {
            setAmountToSell(e.target.value);
        }
        
    }
    if (IsDataRead) {
        return (
            <article>
                <section>
                    <div className={stylesMyMusicList.container}>
                    <div className={stylesMyMusicList.leftBox}>
                        <div className={stylesMyMusicList.musicDescription}>
                        Current Amount : {SelectedAmount}
                            <div className={stylesMyMusicList.imgGrid}>
                                <img src={SelectedImage} alt={SelectedImage} width="200"></img>
    
                            </div>
                            <div className={stylesMyMusicList.firstRow}>
                                <div>
                                    Title
                                </div>
                                {/* <div>
                                    Price
                                </div> */}
                            </div>
                            <div className={stylesMyMusicList.firstRowInfo}>
                                <div>
                                    {SelectedTitle}
                                </div>
                            </div>
                            <div className={stylesMyMusicList.secondRow}>
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
                            <div className={stylesMyMusicList.secondRowInfo}>
                                <div>
                                    {SelectedArtist}
                                </div>
                                <div>
                                    {SelectedGenre}
                                </div>
                                <div>
                                    {SelectedTokenID}
                                </div>
                            </div>
                            <div className={stylesMyMusicList.thirdRow}>
                                Description
                            </div>
                            <div className={stylesMyMusicList.thirdRowInfo}>
                                {SelectedDescription}
                            </div>
                            <div className={stylesMyMusicList.fourthRow}>
                                External URL
                            </div>
                            <div className={stylesMyMusicList.fourthRowInfo}>
                                {SelectedExternalURL}
                            </div>
                            
                        </div>
                        <div className={stylesMyMusicList.buttons}>
                                <button className={stylesMyMusicList.sell} onClick={() => {
                                    if (SellButtonText === "Sell")
                                        clickSellButton();
                                    else if (SellButtonText === "Approve")
                                        clickApproveButton();
                                    else if (SellButtonText === "Add on tradeblock")
                                        clickAddOnTradeblock();
                                }}>{SellButtonText}
                                </button>
                                <div style={{ visibility: IsInputVisible }} className={stylesMyMusicList.bbb}>BBB</div>
                                <input style={{ visibility: IsInputVisible }} className={stylesMyMusicList.priceInput} type="number" min="0" onChange={putPrice} min="0" placeholder="Set price"></input>
                                <input className={stylesMyMusicList.amountInput} type="number" onChange={putAmountToSell} style={{ visibility: IsInputVisible }} placeholder="Set amount to sell"></input>
                        </div>
                    </div>
                    <div className={stylesMyMusicList.rightBox}>
                            <div className={stylesMyMusicList.musicDescription}>
                                Your NFTs
                                <div className={stylesMyMusicList.MTs}>
                                    {
                                        TokenIDs.map((res, index) => (
                                            <div key={index}>
                                                <button  className={stylesMyMusicList.entryMine} style={{ marginBottom: "10px" }} onClick={() => putSongInfo(index)}>
                                                  <div>{Artists[index]}</div> <div><p>-</p></div> <div><p>{Titles[index]}</p></div></button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                 <button className={stylesMyMusicList.sell} className={stylesMyMusicList.play} onClick={clickPlayButton}>Play</button>
                            </div>
                    </div>
                        

                    </div>
                </section>
            </article>
        );
    }
    else {

        return ( 
            <div className={stylesMyMusicList.loaderContainer}>
            <Loader />
        </div>
        )
    }
}

export default MyMusicList;
