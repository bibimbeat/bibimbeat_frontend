import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MusicFactory from '../../abi/MusicFactory.json';
import MusicMarket from '../../abi/MusicMarket.json';
import addresses from '../../environment/ContractAddress.json';
import axios from 'axios';
import './myMusicList.css';
import { useDispatch } from 'react-redux';
import { onChangeMusic } from './../../redux/modules/playButton';

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
        console.log(CreatorAddresses[i]);
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
            if (network.chainId === 4) {
                const listAccounts = await provider.listAccounts();
                if (listAccounts.length) {
                    const signer = await provider.getSigner();
                    const musicFactory = new ethers.Contract(addresses.musicFactory, MusicFactory.abi, signer);
                    const address = await signer.getAddress();
                    const tokenLengthHex = await musicFactory.tokenId();
                    const tokenLength = parseInt(tokenLengthHex._hex);
                    const addressArray = Array(tokenLength).fill(address);
                    const tokenArray = [...Array(tokenLength)].map((_, i) => i + 1);
                    console.log("address Array : " + addressArray);
                    console.log("token Array : " + tokenArray);
    
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
                    console.log(tokenAmountList);
    
                    setTokenIDs(tokenIDList);
                    setAmounts(tokenAmountList);

                    // const promises = tokenIDList.map((i) => {
                    //     console.log(i);
                    // });
                    // const newPromises = await Promise.all(promises);
                    
                    // console.log("newPromises : " + newPromises);
    
                    await tokenIDList.reduce(async (prevPromise, res, index) => {
                        // await prevPromise;
                        console.log("res1: " + res);
                        const uri = await musicFactory.getTokenURI(res);
                        console.log("res2: " + res);
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
                }
            }
        }

        renderNFTList();
        window.ethereum.on('accountsChanged', () => {
            console.log("account changed!");
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
        console.log(e.target.value)
        if (e.target.value) {   
            const price = ethers.utils.parseEther(e.target.value); // * 18
            setPrice(price);
        }
        else {
            setPrice(0);
        }
    }

    const putAmountToSell = (e) => {
        setAmountToSell(e.target.value);
    }

    return (
        <article>
            <section>
                <div className="container">
                    <div className="musicDescription">
                        <div className="imgGrid">
                            <img src={SelectedImage} alt={SelectedImage} width="200"></img>{SelectedAmount}

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
                                {SelectedTitle}
                            </div>
                            <div>
                                <input className="priceInput" type="number" onChange={putPrice} min="0" placeholder="Set price"></input> BBB
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
                                {SelectedArtist}
                            </div>
                            <div>
                                {SelectedGenre}
                            </div>
                            <div>
                                {SelectedTokenID}
                            </div>
                        </div>
                        <div className="thirdRow">
                            Description
                        </div>
                        <div className="thirdRowInfo">
                            {SelectedDescription}
                        </div>
                        <div className="fourthRow">
                            External URL
                        </div>
                        <div className="fourthRowInfo">
                            {SelectedExternalURL}
                        </div>
                        <div className="buttons">
                            <button className="sell" onClick={() => {
                                if (SellButtonText === "Sell")
                                    clickSellButton();
                                else if (SellButtonText === "Approve")
                                    clickApproveButton();
                                else if (SellButtonText === "Add on tradeblock")
                                    clickAddOnTradeblock();
                            }}>{SellButtonText}
                            </button>
                            <input className="amountInput" type="number" onChange={putAmountToSell} style={{ visibility: IsInputVisible }} placeholder="Set amount to sell"></input>
                            <button className="sell" id="play" onClick={clickPlayButton}>play</button>
                        </div>
                    </div>
                    <div>
                        <div className="musicDescription">
                            <div className="MTs">
                                {
                                    TokenIDs.map((res, index) => (
                                        <div key={index}>
                                            <button style={{ marginBottom: "10px" }} onClick={() => putSongInfo(index)}>{Artists[index]} - {Titles[index]}</button>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="scrollbar">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default MyMusicList;
