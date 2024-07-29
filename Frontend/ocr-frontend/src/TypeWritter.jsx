// useTypewriter.js
import React, { useState, useEffect } from 'react';
import './TypeWritter.css'
import { v4 as uuidv4 } from 'uuid';

const useTypewriter = (text, speed = 30) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

const handleCopy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Text copied to clipboard!');
  });
};

const handleDownload = (text) => {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  const fileId = uuidv4()
  element.download = `extracted_text_${fileId}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};


const Paragraph = ({ text }) => {
  const displayedText = useTypewriter(text)
  return (
    <React.Fragment>
      <pre>{displayedText}</pre>
      <div className="buttons">
        <button onClick={() => handleCopy(text)}>Copy</button>
        <button onClick={() => handleDownload(text)}>Download</button>
      </div>
    </React.Fragment>
)
}

export default Paragraph;
