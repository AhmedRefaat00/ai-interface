import React, { useState } from 'react'
import './App.css'
import LLM from './components/LLM';
import ImageGenerator from './components/ImageGenerator';

function App() {
  const [show, setShow] = useState(0);

  return (
    <div className="chat-app-container">
      <h2 className="chat-app-title">AI Chat</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', gap: '10px' }}>
        <button onClick={() => setShow(0)} style={{ width: '100px', height: '30px', borderRadius: '5px', border: '1px solid #000', backgroundColor: '#000', color: '#fff' }}>Show LLM</button>
        <button onClick={() => setShow(1)} style={{ width: '100px', height: '30px', borderRadius: '5px', border: '1px solid #000', backgroundColor: '#000', color: '#fff' }}>Show Image</button>
      </div>
      {show === 0 && <LLM />}
      {show === 1 && <ImageGenerator />}
    </div>
  );
}

export default App