import React, { createContext, useContext, useReducer } from 'react';

// Define initial state
const initialState = {
  messages: [],
  messageTracking: {}
};

// Define a reducer to handle state changes
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      // Update message count and time tracking
      const { receiverId, time } = action.payload;
      const tracking = { ...state.messageTracking };

      if (tracking[receiverId]) {
        tracking[receiverId].count += 1;
        tracking[receiverId].times.push(time);
      } else {
        tracking[receiverId] = { count: 1, times: [time] };
      }

      return {
        ...state,
        messages: [...state.messages, action.payload],
        messageTracking: tracking
      };
    default:
      return state;
  }
};

// Create context
const MessageContext = createContext();

// Provide context
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addMessage = (message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  return (
    <MessageContext.Provider value={{ state, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Use context hook
export const useMessageContext = () => {
  return useContext(MessageContext);
};
