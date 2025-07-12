import React from 'react';

const UserReelsCard = () => {
  return (
    <div className="w-[15rem] rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-[9/16] bg-black">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2025/06/03/283533_tiny.mp4"
          controls
         
        />
        {/* Play icon overlay (optional, for style) */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-12 h-12 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div> */}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-8 h-8 rounded-full border"
          />
          <span className="font-semibold text-gray-800 text-sm">niloy_reels</span>
        </div>
        <p className="text-xs text-gray-600 mt-1 truncate">
          Awesome travel moments! #travel #nature
        </p>
        <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            1.2k
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="5" r="2" />
            </svg>
            320
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserReelsCard;