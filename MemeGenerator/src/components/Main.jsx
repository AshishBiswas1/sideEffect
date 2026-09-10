import { useEffect, useState } from 'react';

export default function Main() {
  /**
   * Challenge: move the hardcoded meme info into React
   * state. Use an object with `topText`, `bottomText`,
   * and `imageUrl` properties, and set the initial values to
   * the ones hardcoded below.
   */
  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((memeObj) => setAllMeme(memeObj.data.memes));
  }, []);

  function getMeme() {
    // console.log(allMeme);
    const indx = Math.floor(Math.random() * allMeme.length);
    const randomMeme = allMeme[indx].url;
    setMeme((data) => ({ ...data, imageUrl: randomMeme }));
  }

  /**
   * Challenge: Get a random image from the array of
   * allMemes when the user clicks the button. Once
   * you've gotten a random image from the array, make
   * sure to write the code that will display that
   * random meme image to the page.
   */

  const [meme, setMeme] = useState({
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
    topText: 'One does not simply',
    bottomText: 'Walk into Mordor'
  });

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    /**
     * Challenge: update the topText value in the meme state
     * object every time the topText input box is changed
     *
     * Note: don't worry about bottomText at this point.
     */

    setMeme((prevMeme) => {
      return { ...prevMeme, [name]: value };
    });
  }

  /**
   * Challenge:
   * Get an array of memes from the imgflip API as soon as
   * this component renders for the first time.
   * Check the imgflip documentation for the correct URL.
   * Save the array of memes (not the whole response
   * data) to state. (For this app, we'll randomly choose
   * one of the memes from this array when the user clicks
   * the "Get a new meme image" button, but we'll do that in
   * a separate challenge.)
   *
   * Hint: for now, don't try to use an async/await function.
   * Instead, use `.then()` to resolve the promises
   * from using `fetch`. We'll learn why after this challenge.
   */

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
