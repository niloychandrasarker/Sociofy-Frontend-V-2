import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import StoryCircle from "./StoryCircle";
import Card from "@mui/material/Card";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import HomeRight from "../HomeRight/HomeRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const story = [1, 1, 1, 1, 1, 1];
const posts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function MidlePart() {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const handleOpenCreatePostModal = () => {
    setShowCreatePostModal(true);
  };

  const handleCloseCreatePostModal = () => {
    setShowCreatePostModal(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 space-y-6 pb-20 lg:pb-6">
      {/* Story Section */}
      <Card className="p-4 sm:p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg hover-lift">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {/* Add Story Button */}
          <div className="flex flex-col items-center min-w-0 flex-shrink-0 cursor-pointer group">
            <div className="relative">
              <Avatar
                sx={{ width: { xs: 60, sm: 70, md: 80 }, height: { xs: 60, sm: 70, md: 80 } }}
                className="ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
              >
                <AddIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} className="text-blue-600" />
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <AddIcon sx={{ fontSize: "1rem" }} className="text-white" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2 text-center">Add Story</p>
          </div>

          {/* Story Items */}
          {story.map((item, index) => (
            <StoryCircle key={index} />
          ))}
        </div>
      </Card>

      {/* Create Post Section - Facebook Style */}
      <Card className="rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg hover-lift overflow-hidden">
        {/* Main Create Post Area */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar 
              sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}
              className="ring-2 ring-gray-100 flex-shrink-0"
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            />
            <input
              readOnly
              onClick={handleOpenCreatePostModal}
              className="flex-1 outline-none rounded-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300 transition-all duration-200 cursor-pointer text-sm sm:text-base text-gray-500"
              placeholder="What's on your mind, Niloy?"
              type="text"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4"></div>

          {/* Action Buttons - Facebook Style */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleOpenCreatePostModal}
              className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-red-600 font-medium transition-all duration-200 group"
            >
              <div className="p-1 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
                <VideocamIcon className="text-red-500 text-lg sm:text-xl" />
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Live video</span>
              <span className="text-xs font-medium sm:hidden">Live</span>
            </button>
            
            <button
              onClick={handleOpenCreatePostModal}
              className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-green-600 font-medium transition-all duration-200 group"
            >
              <div className="p-1 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                <ImageIcon className="text-green-500 text-lg sm:text-xl" />
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Photo/video</span>
              <span className="text-xs font-medium sm:hidden">Photo</span>
            </button>
            
            <button
              onClick={handleOpenCreatePostModal}
              className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-yellow-600 font-medium transition-all duration-200 group"
            >
              <div className="p-1 rounded-full bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
                <EmojiEmotionsIcon className="text-yellow-500 text-lg sm:text-xl" />
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Feeling/activity</span>
              <span className="text-xs font-medium sm:hidden">Feeling</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Create Post Modal - Mobile Optimized */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Create post</h2>
              <button
                onClick={handleCloseCreatePostModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <Avatar 
                  sx={{ width: 48, height: 48 }}
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                  className="ring-2 ring-gray-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Code With Niloy</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <button className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Public</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                placeholder="What's on your mind, Niloy?"
                className="w-full h-32 resize-none outline-none text-lg placeholder-gray-400 bg-transparent"
                autoFocus
              />

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                  <ImageIcon className="text-green-500 group-hover:text-green-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Add Photo</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                  <VideocamIcon className="text-purple-500 group-hover:text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Add Video</span>
                </button>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <LocationOnIcon className="text-red-500 text-lg" />
                    </div>
                    <span className="font-medium text-gray-700">Add location</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <PersonAddIcon className="text-blue-500 text-lg" />
                    </div>
                    <span className="font-medium text-gray-700">Tag people</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <EmojiEmotionsIcon className="text-yellow-500 text-lg" />
                    </div>
                    <span className="font-medium text-gray-700">Feeling/activity</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleCloseCreatePostModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Section */}
      <div className="space-y-6">
        {posts.map((item, index) => (
          <PostCard key={index} />
        ))}
      </div>

      {/* Mobile HomeRight Section - Only visible on mobile */}
      <div className="block sm:hidden mt-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover</h3>
          <HomeRight />
        </div>
      </div>
    </div>
  );
}

export default MidlePart;