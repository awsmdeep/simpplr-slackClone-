import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

function Header({ channels }) {
 



  return (
    <div className="flex items-center justify-between bg-[#310A34] border border-black p-4">
      <div className="flex items-center">
        <Avatar className="ml-4" />
      </div>
     
      <div className="flex items-center">
        <HelpOutlineIcon className="text-white" />
      </div>
    </div>
  );
}

export default Header;
