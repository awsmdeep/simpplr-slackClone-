import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from './MessageContext';
import axios from 'axios';

const DirectMessageChat = () => {
  const { id } = useParams(); // Get user ID from route parameter
  const { state, addMessage } = useMessageContext();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [email,setEmail] = useState("");

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get('https://simpplr-slackclone.onrender.com/user/getinfo');
            const trimmedMail = result.data.email.replace('@gmail.com','');
            console.log(trimmedMail);
            setEmail(trimmedMail);
        };

        getData();
    },[]);

  // Example currentUserId for testing purposes
  const currentUserId = 'sd'; // Replace with your actual current user ID implementation

  // User data with names and IDs
  const users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Michael Johnson' },
  ];

  // Function to get username based on user ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  // Function to handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      // Add the user's message with current timestamp
      addMessage({ senderId: currentUserId, receiverId: id, text: newMessage, time: getCurrentTime() });
      setNewMessage('');
      scrollToBottom();

      // Check for specific messages and send automated replies
      setTimeout(() => {
        const messageText = newMessage.toLowerCase();

        if (messageText.includes('hi') || messageText.includes('hello')) {
          addAutomatedReply("Hi there! How can I assist you?");
        } else if (messageText.includes('how are you')) {
          addAutomatedReply("I'm doing well, thanks for asking!");
        }
      }, 1000); // Adjust delay time as needed
    }
  };

  // Function to add an automated reply message
  const addAutomatedReply = (replyMessage) => {
    addMessage({ senderId: id, receiverId: currentUserId, text: replyMessage, time: getCurrentTime() });
    scrollToBottom();
  };

  // Function to handle typing indicator
  const handleTyping = () => {
    setIsTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500); // Assuming 1.5 seconds timeout for typing indicator
  };

  // Scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper function to get current time in HH:mm format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]); // Scroll to bottom when messages update

  useEffect(() => {
    scrollToBottom();
  }, []); // Initial scroll to bottom on component mount

  return (
    <div className="flex flex-col h-700 w-screen bg-[#310a34]">
      {/* Chat header */}
      <div className="bg-[#1a1d21]  shadow-md">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg text-gray-300 font-semibold">{getUserName(id)}</h2>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4">
        {state.messages.map((message, index) => (
          <div key={index} className={`flex flex-col items-${message.senderId === currentUserId ? 'end' : 'start'} my-2`}>
            <div className={`flex items-center space-x-2 mb-1 ${message.senderId === currentUserId ? 'justify-end rtl:space-x-reverse' : ''}`}>
              <span className={`text-xs font-medium text-gray-500 ${message.senderId === currentUserId ? 'self-end' : ''}`}>{email.length > 0 ? email : "Null"}</span>
              <span className="text-xs text-gray-500">{message.time}</span>
            </div>
            <div className={`p-2 rounded-lg max-w-[75%] ${message.senderId === currentUserId ? 'bg-blue-100 text-black self-end' : 'bg-gray-200 self-start'}`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isTyping && (
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-200">Typing...</span>
          </div>
        )}
      </div>
      
      {/* Message input form */}
      <form onSubmit={handleSubmit} className="bg-[#310A34] p-2 flex-shrink-0">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            className="w-full py-2 px-3 focus:outline-none"
          />
          <button type="submit" className="px-4 bg-gray-500 text-white hover:bg-[#310A34] focus:outline-none">Send</button>
        </div>
      </form>
    </div>
  );
};

export default DirectMessageChat;
