import React, { useState } from 'react';
import { useMessageContext } from './MessageContext';

// User data with names and IDs (this can also be imported from a separate file)
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

// Function to format message times
const formatMessageTimes = (times) => {
  return times.map(time => {
    const [hours, minutes] = time.split(':');
    const formattedTime = `${parseInt(hours, 10)}:${minutes} ${parseInt(hours, 10) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  }).join(', ');
};

const AnotherComponent = () => {
  const { state } = useMessageContext();

  // State to track which user's notifications are expanded
  const [expandedUserId, setExpandedUserId] = useState(null);

  // Handle click to expand/collapse notifications for a user
  const handleUserClick = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null); // Collapse if already expanded
    } else {
      setExpandedUserId(userId); // Expand clicked user's notifications
    }
  };

  return (
    <div className="flex justify-center items-center h-700 w-screen bg-gray-100 dark:bg-[#1A1D21]">
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#310a34] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Slack Notifications</h1>

        {/* Display all users with click to expand notifications */}
        {users.map(user => (
          <div key={user.id} className="mb-4">
            <button
              className={`w-full p-4 rounded-lg shadow-md flex justify-between items-center focus:outline-none ${user.id === expandedUserId ? 'bg-blue-200 dark:bg-[#b644beb5]' : 'bg-white dark:bg-gray-800'}`}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {getUserName(user.id)}
                </span>
                {state.messageTracking[user.id] && (
                  <span className="ml-2 px-2 py-0.5 text-sm font-medium text-gray-100 bg-[#d440de] rounded-md">
                    {state.messageTracking[user.id].count} messages
                  </span>
                )}
              </div>
              <span className="text-sm">{user.id === expandedUserId ? '▲' : '▼'}</span>
            </button>

            {/* Render notifications if user is expanded */}
            {user.id === expandedUserId && (
              <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Message Times: {formatMessageTimes(state.messageTracking[user.id]?.times) || '-'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnotherComponent;
