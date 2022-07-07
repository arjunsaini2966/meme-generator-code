import React from "react";
// import MemeData from "../MemeData";

// meme form for top text and bottom text
export default function Meme() {
  const [memes, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage:
      "https://www.livelaw.in/h-upload/2022/05/24/419103-kgfcabs1649318906810.jpg",
  });
  const [allMeme, setAllMeme] = React.useState(memes);
  //calling imgflip api for meme image
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    getMemes();
  }, []);
  // setting random meme image
  function getMemeImg() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    let url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // getting top text and bottom text
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="topText"
          className="form-input"
          name="topText"
          value={memes.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="bottomText"
          className="form-input"
          name="bottomText"
          value={memes.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImg}>
          Get a new meme image
        </button>
      </div>
      <div className="img-box meme">
        <img src={memes.randomImage} className="meme-img" />
        <h2 className="meme-text top">{memes.topText}</h2>
        <h2 className="meme-text bottom">{memes.bottomText}</h2>
      </div>
    </main>
  );
}
