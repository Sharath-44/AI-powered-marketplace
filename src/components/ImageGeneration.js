import React, { useState } from 'react';
import './ImageGeneration.css';

const ImageGenerationComponent = () => {
  const [textInput, setTextInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [selectedItem, setSelectedItem] = useState(''); // State to store the selected item

  const items = ['T Shirt', 'Mugs', 'Laptop skins'];

  const handleGenerateImage = () => {
    // Replace spaces with underscores in the text input
    const formattedText = textInput.replace(/ /g, '_');

    // Construct the URL
    const url = `http://7187-14-143-35-158.ngrok-free.app/generate_image/${formattedText}`;

    // Fetch the image
    fetch(url)
      .then(response => response.text())
      .then(base64Image => {
        // Update the state with the generated image
        setGeneratedImage(`data:image/png;base64, ${base64Image}`);
      })
      .catch(error => {
        console.error('Failed to fetch image:', error);
      });
  };

  return (
    <div>
      <div className="hero is-primary is-fullwidth">
        <div className="hero-body container">
          <h4 className="title">Generate Image</h4>
        </div>
      </div>
      <div className="image-generation-container">
            <label htmlFor="itemSelect">Choose an Item to customize: </label>
            <select
              id="itemSelect"
              className="item-select"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              {items.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <label htmlFor="textInput">Enter Text: </label>
            <input
              type="text"
              id="textInput"
              className="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button className="generate-button" onClick={handleGenerateImage}>
              Generate Image
            </button>
      
        

        {/* Display the generated image */}
        {generatedImage && (
          <div className="generated-image-container">
            <h3>Generated Image</h3>
            <img src={generatedImage} alt="Generated Image" />
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageGenerationComponent;
