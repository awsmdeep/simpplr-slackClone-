import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt , faComments, faBell } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState(["general", "random", "help"]);
  const [filteredChannels, setFilteredChannels] = useState([...channels]);
  const [newChannelName, setNewChannelName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filtered = channels.filter(channel =>
      channel.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChannels(filtered);
  }, [channels, searchQuery]);

  const handleCreateChannel = () => {
    if (newChannelName.trim() !== '') {
      setChannels([...channels, newChannelName.trim()]);
      setNewChannelName('');
    }
  };

  const dummyUsers = [
    { id: 1, name: 'John Doe', profilePic: 'https://example.com/profile1.jpg' },
    { id: 2, name: 'Jane Smith', profilePic: 'https://example.com/profile2.jpg' },
    { id: 3, name: 'Michael Johnson', profilePic: 'https://example.com/profile3.jpg' },
    // Add more users as needed
  ];

  return (
    <div className="bg-[#1E0F21] border-black  text-white w-64 flex-shrink-0 p-4">
      <h2 className="text-xl mb-4">Channels</h2>
      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          placeholder="New Channel Name"
          className="bg-[#714F76] rounded-lg px-4 py-1 outline-none placeholder-gray-300 text-white  w-30"
        />
        <button onClick={handleCreateChannel} className="text-gray-100 bg-[#8a2691] px-4 py-1 mt-4 rounded">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Create
        </button>
      </div>
      <div className="mb-2 flex items-center">
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Channels"
          className="bg-[#714F76] rounded-lg px-4 py-1 outline-none placeholder-gray-300 text-white w-full"
        />
      </div>
      {filteredChannels.map(channel => (
        <div 
          key={channel}
          onClick={() => navigate(`/channel/${channel}`)}
          className="cursor-pointer p-2 hover:bg-gray-600 rounded"
        >
          #{channel}
        </div>
      ))}
      
      {/* Direct Messages */}
      <div className="mt-7">
        <div className="text-10 mb-2 flex items-center">
          <FontAwesomeIcon icon={faComments} className="text-gray-400 mr-2" />
          Direct Messages
        </div>
        {dummyUsers.map(user => (
          <Link key={user.id} to={`/directmessages/${user.id}`} className="block ml-2 mt-2  hover:bg-gray-500 rounded">
            <div className="flex items-center space-x-2">
           
              <div>{user.name}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Notifications */}
      <div 
        onClick={() => navigate('/notifications')}
        className="cursor-pointer text-10 mt-7 flex items-center hover:bg-gray-700 rounded"
      >
        <FontAwesomeIcon icon={faBell} className="text-gray-400 mr-2" />
        Notifications
      </div>
      <div 
        onClick={() => navigate('/')}
        className="cursor-pointer text-10 mt-7 flex items-center hover:bg-gray-700 rounded"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400 mr-2" />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
