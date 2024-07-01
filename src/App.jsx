import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Auth/Header';
import Sidebar from './components/Auth/Sidebar';
import Chat from './components/Auth/Chat';
import DirectMessages from './components/Auth/DirectMessages'; 
import Notifications from './components/Auth/Notifications'; 
import SearchBar from './components/Auth/SearchBar'; 
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import ConfirmMail from './components/Auth/ConfirmMail/ConfirmMail';
import LandingPage from './components/Auth/Landing/Landing';
import { MessageProvider } from './components/Auth/MessageContext';
import MainLanding from './components/Auth/MainLandingPage/MainLanding';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [channels, setChannels] = useState(["general", "random", "help"]);
  const [filteredChannels, setFilteredChannels] = useState([...channels]);
  const [searchQuery, setSearchQuery] = useState('');

  // Update filtered channels whenever channels or searchQuery change
  useEffect(() => {
    const filtered = channels.filter(channel =>
      channel.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChannels(filtered);
  }, [channels, searchQuery]);

  const handleCreateChannel = (newChannelName) => {
    if (newChannelName.trim() !== '') {
      const trimmedName = newChannelName.trim();
      if (!channels.includes(trimmedName)) {
        setChannels([...channels, trimmedName]);
      }
    }
  };

  // Function to determine if Sidebar and Header should be shown based on route
  const showSidebarAndHeader = () => {
    const { pathname } = location;
    // List of paths where Sidebar and Header should not be shown
    const excludedPaths = ['/login', '/register', '/confirmmail', '/landing', '/main'];
    return !excludedPaths.includes(pathname);
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmmail" element={<ConfirmMail />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<MainLanding />} />
        
        {showSidebarAndHeader() && (
          <Route
            path="*"
            element={
              <div className="h-screen flex flex-col">
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <MessageProvider>
                  <div className="flex flex-grow">
                    <Sidebar channels={filteredChannels} handleCreateChannel={handleCreateChannel} />
                    <Routes>
                      <Route path="/channel/:channelId" element={<Chat />} />
                      <Route path="/directmessages/:id" element={<DirectMessages />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/search" element={<SearchBar channels={filteredChannels} messages={[]} />} />
                      <Route path="/channel" element={<div className="bg-[#1A1D21] text-white flex-grow flex justify-center items-center "><h1>Welcome</h1></div>} />
                    </Routes>
                  </div>
                </MessageProvider>
              </div>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
