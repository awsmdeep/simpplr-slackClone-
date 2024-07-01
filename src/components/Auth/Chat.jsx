// Chat.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Chat() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [editorContent, setEditorContent] = useState('');

  const sendMessage = () => {
    if (editorContent.trim() === '') return; // Prevent sending empty messages

    const newMessage = {
      user: 'User', // Replace with actual user or simulate user data
      text: editorContent,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setEditorContent(''); // Clear the editor after sending the message
  };

  return (
    <div className="flex-grow bg-[#1A1D21] p-4">
      <h2 className="text-2xl mb-4 text-white">#{channelId}</h2>
      <div className="mb-4">
        {messages.map((message, index) => (
          <Message key={index} user={message.user} text={message.text} timestamp={message.timestamp} />
        ))}
      </div>
      <div className="mt-4">
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Type your message..."
          className="bg-[#222529] text-white placeholder-white p-2 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="text-gray-100 bg-[#8a2691] focus:outline-none px-4 py-2 ml-2 rounded-md mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
