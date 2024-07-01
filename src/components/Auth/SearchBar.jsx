// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ channels, messages }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChannels = channels.filter(channel =>
    channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl mb-4">Search</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="bg-gray-300 p-2 rounded-md"
      />
      <h3 className="text-lg mt-4">Channels:</h3>
      <ul>
        {filteredChannels.map((channel, index) => (
          <li key={index}>{channel}</li>
        ))}
      </ul>
      <h3 className="text-lg mt-4">Messages:</h3>
      <ul>
        {filteredMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
