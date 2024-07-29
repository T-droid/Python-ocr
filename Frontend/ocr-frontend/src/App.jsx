import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Paragraph from './TypeWritter';
import tesGif from "./assets/tessa.png";

const API = 'https://tesseract-e4e2eeb45855.herokuapp.com/upload';

function App() {
  const [file, setFile] = useState(null);
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post(API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTexts(prevTexts => [...prevTexts, response.data.text]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleReset = () => {
  //   setFile(null);
  //   setTexts([]);
  // };

  return (
    <div className="App">
      <img src={tesGif} alt="gif" className='logo' />
      <header className="App-header">
        <h1>Tessereact</h1>
        <h1>Upload Image to Extract Text</h1>
      </header>
      <div className="container">
        <input type="file" className='file-input' onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || loading}>
          {loading ? 'Processing...' : 'Upload and Extract Text'}
        </button>
        {/* <button onClick={handleReset} disabled={loading}>
          Reset
        </button> */}
        {texts.length > 0 && (
          <div className="result">
            <h2>Extracted Texts:</h2>
            {texts.map((text, index) => (
              <Paragraph key={index} text={text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
