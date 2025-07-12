import { Avatar, CardHeader, IconButton } from '@mui/material';
import { red } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

const PopularUserCard = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Avatar 
          sx={{ 
            bgcolor: red[500],
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 }
          }} 
          aria-label="user"
          className="ring-2 ring-gray-100 group-hover:ring-blue-100 transition-all duration-200"
        >
          R
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
            Code with niloy
          </h4>
          <p className="text-xs lg:text-sm text-gray-500 truncate">
            @codewithniloy • Suggested for you
          </p>
        </div>
      </div>
      
      <button
        onClick={handleFollow}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover-scale ${
          isFollowing
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default PopularUserCard;