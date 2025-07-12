import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction, likeReelAction } from '../../Redux/Reels/reels.action';
import UserReelsCard from './UserReelsCard';
import { Card, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Reels() {
  const dispatch = useDispatch();
  const { reels } = useSelector((store) => store);
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState(new Set());

  useEffect(() => {
    dispatch(getAllReelsAction());
  }, [dispatch]);

  const handleLike = async (reelId) => {
    try {
      await dispatch(likeReelAction(reelId));
    } catch (error) {
      console.error('Error liking reel:', error);
    }
    
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const reelsData = reels.reels || [];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md mx-auto relative">
        {/* Reels Container */}
        <div className="relative h-screen max-h-[800px] bg-black rounded-2xl overflow-hidden">
          {reelsData.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-transform duration-300 ${
                index === currentReel ? 'translate-y-0' : 
                index < currentReel ? '-translate-y-full' : 'translate-y-full'
              }`}
            >
              {/* Video */}
              <video
                className="w-full h-full object-cover"
                src={reel.videoUrl}
                autoPlay={isPlaying}
                muted={isMuted}
                loop
                playsInline
              />

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                {/* Top Controls */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <h1 className="text-white font-bold text-lg">Reels</h1>
                  <div className="flex space-x-2">
                    <IconButton onClick={handleMute} className="text-white">
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                  </div>
                </div>

                {/* Center Play/Pause */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconButton
                    onClick={handlePlayPause}
                    className="text-white bg-black/30 hover:bg-black/50"
                    sx={{ width: 64, height: 64 }}
                  >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
                  </IconButton>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    {/* User Info and Caption */}
                    <div className="flex-1 mr-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-gray-700">
                            {reel.user.firstName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {reel.user.firstName} {reel.user.lastName}
                          </p>
                          <p className="text-gray-300 text-xs">@{reel.user.username}</p>
                        </div>
                      </div>
                      <p className="text-white text-sm leading-relaxed">
                        {reel.caption}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col items-center">
                        <IconButton
                          onClick={() => handleLike(reel.id)}
                          className="text-white hover:scale-110 transition-transform"
                        >
                          {likedReels.has(reel.id) ? (
                            <FavoriteIcon className="text-red-500" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                        <span className="text-white text-xs font-medium">
                          {reel.likes + (likedReels.has(reel.id) ? 1 : 0)}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <IconButton className="text-white hover:scale-110 transition-transform">
                          <CommentIcon />
                        </IconButton>
                        <span className="text-white text-xs font-medium">{reel.comments}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <IconButton className="text-white hover:scale-110 transition-transform">
                          <ShareIcon />
                        </IconButton>
                        <span className="text-white text-xs font-medium">{reel.shares}</span>
                      </div>

                      <IconButton className="text-white hover:scale-110 transition-transform">
                        <BookmarkBorderIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
            {reelsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReel(index)}
                className={`w-2 h-8 rounded-full transition-colors ${
                  index === currentReel ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Swipe Navigation */}
          <div className="absolute inset-0 flex flex-col">
            <button
              onClick={() => setCurrentReel(Math.max(0, currentReel - 1))}
              className="flex-1 w-full"
              disabled={currentReel === 0}
            />
            <button
              onClick={() => setCurrentReel(Math.min(reelsData.length - 1, currentReel + 1))}
              className="flex-1 w-full"
              disabled={currentReel === reelsData.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
