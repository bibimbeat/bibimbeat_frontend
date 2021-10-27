import stylesMint from "./mintNFT.module.css";
import axios from "axios";
import { useRef, useState } from 'react';
import imageUpload from "../images/imageUpload.png";
import songUpload from "../images/uploadSong.png";
import { ethers } from 'ethers';
import MusicFactory from '../../abi/MusicFactory.json';
import addresses from '../../environment/ContractAddress.json';

function MintNFT() {
  const [Title, setTitle] = useState("");
  const [Artist, setArtist] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [ExternalURL, setExternalURL] = useState("");
  const [Amount, setAmount] = useState("");

  const [Image, setImage] = useState(imageUpload);
  const [ImageName, setImageName] = useState("Click to Upload");
  const [Song, setSong] = useState(null);
  const [SongName, setSongName] = useState("Upload Music");

  const [isMintButtonClicked, setIsMintButtonClicked] = useState(false);

  const PutTitle = (e) => setTitle(e.target.value);
  const PutArtist = (e) => setArtist(e.target.value);
  const PutGenre = (e) => setGenre(e.target.value);
  const PutDescription = (e) => setDescription(e.target.value);
  const PutExternalURL = (e) => setExternalURL(e.target.value);
  const PutAmount = (e) => setAmount(e.target.value);

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  const ClickImageInput = () => {
    imageInputRef.current?.click();
  }

  const ClickMusicInput = () => {
    songInputRef.current?.click();
  }

  const UploadImage = (e) => {
    const type = e.target.files[0].type;
    if (!type.startsWith("image")) {
      window.alert("please choose correct data type")
    }
    else {
      setImageName(e.target.files[0].name);
      setImage(e.target.files[0]);
    }
  }

  const UploadMusic = (e) => {
    const type = e.target.files[0].type;
    if (!type.startsWith("audio")) {
      window.alert("please choose correct data type")
    }
    else {
      setSongName(e.target.files[0].name)
      setSong(e.target.files[0]);
    }
  }

  const SubmitForm = async (e) => {
    setIsMintButtonClicked(true);
    e.preventDefault();

    window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();

    if (network.chainId !== 4) {
      alert("Please change your network to rinkeby testnet!");
      setIsMintButtonClicked(false);
    }
    else {
      if (!Title || !Artist || !Genre || !Description || !Amount || (Image === imageUpload) || !Song) {
        let message = "please fill out: ";
        if (!Title) message += "\nTitle";
        if (!Artist) message += ", Artist";
        if (!Genre) message += ", Genre";
        if (!Description) message += ", Description";
        if (!Amount) message += ", Amount";
        if (Image === imageUpload) message += ", Image";
        if (!Song) message += ", Song";
        window.alert(message);
        setIsMintButtonClicked(false);
      }
      else {
        const JsonPosturl = "http://localhost:4000/pinJsonFileToIPFS";
        const ImagePostUrl = "http://localhost:4000/pinAlbumCoverToIPFS";
        const MusicPostUrl = "http://localhost:4000/pinMusicSourceToIPFS";

        // post music source file to the server
        let ipfsImage, ipfsMusic;
        const musicFormData = new FormData();
        musicFormData.append("music", Song);
        // post image file to the server
        const imageFormData = new FormData();
        imageFormData.append("image", Image);

        await axios.all([
          axios.post(ImagePostUrl, imageFormData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          }),
          axios.post(MusicPostUrl, musicFormData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
        ]).then(axios.spread((resImage, resMusic) => {
          ipfsImage = "ipfs://" + resImage.data;
          ipfsMusic = "ipfs://" + resMusic.data;
        }));

        const signer = await provider.getSigner();
        const creatorAddress = await signer.getAddress();

        const data = {
          name: Title,
          artist: Artist,
          genre: Genre,
          description: Description,
          image: ipfsImage,
          animation_url: ipfsMusic,
          external_url: ExternalURL,
          creatorAddress: creatorAddress
        };

        // post json file to the server
        const metadataJson = await axios.post(JsonPosturl, data, {
          headers: { "Content-Type": "application/json" }
        });

        const metadataUri = metadataJson.data;
        const musicFactory = new ethers.Contract(addresses.musicFactory, MusicFactory.abi, signer);
        const tx = await musicFactory.mintMusic(Amount, metadataUri);
        await tx.wait();
        window.alert("your NFT has been minted. check your music box!");
        window.location.reload();
      }
    }
  }

  return (
    <article>
      <section>
        <div>
          <div className={stylesMint.imageUpload} onClick={ClickImageInput}>
            <div className={stylesMint.adjust1}>
              <img src={imageUpload} alt={imageUpload}></img>
              <div>{ImageName}</div>
            </div>
            <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={UploadImage} />
          </div>
          <div className={stylesMint.musicUpload} onClick={ClickMusicInput}>
            <div className={stylesMint.adjust2}>
              <img src={songUpload} alt={songUpload}></img>
              <div>{SongName}</div>
            </div>
            <input type="file" ref={songInputRef} style={{ display: "none" }} onChange={UploadMusic} />
          </div>
        </div>
        <div className={stylesMint.rightRow}>
          <div className={stylesMint.mintMetadata}>
            <form>
              <label className={stylesMint.label}>
                Title
              </label>
              <input type="text" onChange={PutTitle}>
              </input>
              <label className={stylesMint.label}>
                Artist
              </label>
              <input type="text" onChange={PutArtist}>
              </input>
              <label className={stylesMint.label}>
                Genre
              </label>
              <input type="text" onChange={PutGenre}>
              </input>
              <label className={stylesMint.label}>
                Description
              </label>
              <input type="text" className={stylesMint.description} onChange={PutDescription}>
              </input>
              <label className="label">
                External URL
              </label>
              <input type="text" onChange={PutExternalURL}>
              </input>
              <label className={stylesMint.label}>
                NFT Amount
              </label>
              <input type="number" onChange={PutAmount}>
              </input>
              </form>
          </div>
          <button className={stylesMint.mintButton} disabled={isMintButtonClicked} onClick={SubmitForm}>Mint NFT</button>
            
        </div>
      </section>
    </article>
  );
}

export default MintNFT;