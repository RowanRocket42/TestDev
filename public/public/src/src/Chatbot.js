import React, { useState } from 'react';
import 'daisyui/dist/full.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { content: message, sender: 'user' }]);
    const response = await fetch('/api/generate-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const botMessage = await response.text();
    setMessages([...messages, { content: message, sender: 'user' }, { content: botMessage, sender: 'bot' }]);
    setMessage('');
  }

  return (
    <div className="h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-6 max-w-md w-full space-y-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center">GPT Chatbot</h1>
        <div className="h-64 overflow-y-auto">
          {messages.map((msg, index) => (
            <p key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>{msg.content}</p>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              className="w-full rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
