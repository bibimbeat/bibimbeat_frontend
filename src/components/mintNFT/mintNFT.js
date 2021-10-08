import "./mintNFT.css";
import axios from "axios";
import { useRef, useState } from 'react';
import imageUpload from "../images/imageUpload.png"
import songUpload from "../images/uploadSong.png"

function MintNFT() {
  const [Text, setText] = useState("");
  const [Title, setTitle] = useState("");
  const [Artist, setArtist] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [ExternalURL, setExternalURL] = useState("");
  const [Amount, setAmount] = useState("");

  const [Image, setImage] = useState(null);
  const [ImageName, setImageName] = useState("Click to Upload");
  
  const [Song, setSong] = useState(null);
  const [SongName, setSongName] = useState("Upload Music");
  
  const PutText = (str) => setText(str);
  
  const PutTitle = (e) => setTitle(e.target.value);
  const PutArtist = (e) => setArtist(e.target.value);
  const PutGenre = (e) => setGenre(e.target.value);
  const PutDescription = (e) => setDescription(e.target.value);
  const PutExternalURL = (e) => setExternalURL(e.target.value);
  const PutAmount = (e) => setAmount(e.target.value);

  const GetPinataAuth = () => {
    const url = "http://localhost:4000";
    axios.get(url).then((res) => {
      PutText(res.data);
      console.log(res.data);
    })
  }

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  const ClickImageInput = () => {
    imageInputRef.current?.click();
  }
  
  const ClickMusicInput = () => {
    songInputRef.current?.click();
  }

  const UploadImage = (e) => {
    console.log(e.target.files[0]);
    setImageName(e.target.files[0].name)
    setImage(e.target.files[0]);
  }

  const UploadMusic = (e) => {
    console.log(e.target.files[0]);
    setSongName(e.target.files[0].name)
    setSong(e.target.files[0]);
  }


  const SubmitForm = () => {
    const JsonPosturl = "http://localhost:4000/pinJsonFileToIPFS";
    const ImagePostUrl = "http://localhost:4000/pinAlbumCoverToIPFS";
    const MusicPostUrl = "http://localhost:4000/pinMusicSourceToIPFS";

    const data = {
      title: Title,
      artist: Artist,
      genre: Genre,
      description: Description,
      externalURL: ExternalURL,
      amount: Amount
    };
    
    console.log(Image);
    console.log(Song);

    // post image file to the server
    const imageFormData = new FormData();
    imageFormData.append("image", Image);
    axios.post(ImagePostUrl, imageFormData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })

    // post music source file to the server
    const musicFormData = new FormData();
    musicFormData.append("music", Song);
    axios.post(MusicPostUrl, musicFormData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })



    // post json file to the server
    // axios.post(JsonPosturl, JSON.stringify(data), {
    //   headers: {"Content-Type": "application/json"}
    // });
  }

    return (
        <article>
            <section>
                <div>
                    <div className="imageUpload" onClick={ClickImageInput}>
                           <div className="adjust1">
                                 <img src={imageUpload}></img>
                                 <div>{ImageName}</div>
                          </div>
                          <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={UploadImage}/>
                    </div>
                    <div className="musicUpload" onClick={ClickMusicInput}>
                            <div className="adjust2">
                                 <img src={songUpload}></img>
                                 <div>{SongName}</div>
                            </div>
                            <input type="file" ref={songInputRef} style={{ display: "none" }} onChange={UploadMusic}/>
                    </div>
                </div>
                <div>
                    <div className="metaData">
                        <form onSubmit={SubmitForm}>
                            <lable className="label">
                                Title
                            </lable>
                            <input type="text" onChange={PutTitle}>
                            </input>
                            <lable className="label">
                                Artist
                            </lable>
                            <input type="text" onChange={PutArtist}>
                            </input>
                            <lable className="label">
                                Genre
                            </lable>
                            <input type="text" onChange={PutGenre}>
                            </input>
                            <lable className="label">
                                Description
                            </lable>
                            <input type="text" className="description" onChange={PutDescription}>
                            </input>
                            <lable className="label">
                                External URL
                            </lable>
                            <input type="text" onChange={PutExternalURL}>
                            </input>
                            <lable className="label" onChange={PutAmount}>
                                NFT Amount
                            </lable>
                            <input type="number">
                            </input>
                            <button type="submit" className="mintButton">Mint NFT</button>
                        </form>
                    </div>
                    
                </div>
            </section>
        </article>
    );
}

export default MintNFT;