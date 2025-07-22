import React, { useState } from 'react'
import {fetchImage} from '../services/FetchAiResponse';


const ImageGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        setPrompt(() => input);
        setInput(() => "");
        setImageUrl(fetchImage(prompt));
        console.log(prompt);
    }

    return (
        <div className="chat-app-main-row">
            <div className="chat-window">
                <div className="chat-messages">
                    <div className="chat-message-row ">
                        <div className="chat-message-bubble user"  style={{ maxHeight: '100px', overflowY: 'auto' }}>
                            <p>{prompt}</p>
                        </div>
                        <div className="chat-message-bubble bot">
                            {imageUrl && (
                                <img src={imageUrl} alt="" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
                            )}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSend} className="chat-input-row">
                    <input type="text" placeholder="Enter a prompt" value={input} onChange={e => setInput(e.target.value)} className="chat-input" />
                    <button type="submit" className="chat-send-btn">Generate</button>
                </form>
            </div>
        </div>
    )
}

export default ImageGenerator