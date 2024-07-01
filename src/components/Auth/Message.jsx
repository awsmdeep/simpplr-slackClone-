// Message.js
import React from 'react';

const getRandomName = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']; // Add more names as needed
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomProfilePicture = () => {
  const randomNumber = Math.floor(Math.random() * 100); // Adjust the range as needed
  return `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
};

function Message({ user, text, timestamp }) {
  const randomUser = {
    name: user?.name || getRandomName(), // Use passed user name or generate random one
    profilePicture: user?.profilePicture || getRandomProfilePicture()
  };

  return (
    <div className="flex items-start gap-2.5">
      <img src={randomUser.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{randomUser.name}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{timestamp}</span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 mb-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div
            className="text-sm font-normal text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
    </div>
  );
}

export default Message;
