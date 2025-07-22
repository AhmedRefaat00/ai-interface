import React, { useState } from 'react';
import { fetchAIResponse } from '../services/FetchAiResponse';

const LLM = () => {

    const [activeChat, setActiveChat] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeChatId, setActiveChatId] = useState(null);
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || activeChatId === null) return;
        setLoading(true);

        const chatIndex = activeChat.findIndex(chat => chat.id === activeChatId);
        const currentMessages = activeChat[chatIndex]?.messages || [];
        const newMessages = [...currentMessages, { role: 'user', content: input }];

        setInput('');

        const aiResponse = await fetchAIResponse(newMessages);

        setActiveChat(prevChats =>
            prevChats.map(chat =>
                chat.id === activeChatId
                    ? { ...chat, messages: [...newMessages, { role: 'assistant', content: aiResponse }] }
                    : chat
            )
        );

        setLoading(false);
    };

    const handleAddChat = () => {
        const newId = activeChat.length > 0 ? Math.max(...activeChat.map(c => c.id)) + 1 : 0;
        setActiveChatId(newId);
        setActiveChat([
            ...activeChat,
            {
                id: newId,
                messages: [
                    // { role: 'assistant', content: 'Hello! This is a new chat. How can I help you?' }
                ]
            }
        ]);
    };

    const currentChat = activeChat.find(chat => chat.id === activeChatId);
    return (
        <div className="chat-app-main-row">
            <div className="chat-sidebar">
                <button className="chat-new-btn" onClick={handleAddChat}>+ New Chat</button>
                <div>
                    {activeChat.map(element => (
                        <button
                            key={element.id}
                            className={`chat-sidebar-btn${element.id === activeChatId ? ' active' : ''}`}
                            onClick={() => setActiveChatId(element.id)}
                        >
                            Chat {element.id}
                        </button>
                    ))}
                </div>
            </div>
            {/* Chat window */}
            <div className="chat-window">
                <div className="chat-messages">
                    {currentChat && currentChat.messages.map((msg, i) => (
                        <div key={i} className={`chat-message-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
                            <div className={`chat-message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>{msg.content}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="chat-input-row">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input"
                        disabled={loading || activeChatId === null}
                    />
                    <button type="submit" className="chat-send-btn" disabled={loading || activeChatId === null}>
                        {loading ? '...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LLM;