
import React from 'react';

function Channel({ name }) {
  return (
    <div className="p-2 cursor-pointer hover:bg-gray-600 rounded">
      #{name}
    </div>
  );
}

export default Channel;
