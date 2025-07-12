import Avatar from '@mui/material/Avatar';
import React from 'react';

const StoryCircle = () => {
  return (
    <div className="flex flex-col items-center min-w-0 flex-shrink-0 cursor-pointer group">
      <div className="relative">
        <Avatar
          sx={{ 
            width: { xs: 60, sm: 70, md: 80 }, 
            height: { xs: 60, sm: 70, md: 80 } 
          }}
          src="https://cdn.pixabay.com/photo/2023/05/02/14/15/british-shorthair-7965411_640.jpg"
          className="ring-4 ring-gradient-to-r from-pink-500 to-orange-500 group-hover:ring-pink-400 transition-all duration-300 hover-scale"
        />
        {/* Online indicator */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2 text-center max-w-20 truncate">
        Code With Niloy
      </p>
    </div>
  );
};

export default StoryCircle;