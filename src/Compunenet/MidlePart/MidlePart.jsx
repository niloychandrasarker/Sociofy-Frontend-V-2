import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
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
import CreatePostModal from "./CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction } from "../../Redux/Post/post.action";

const story = [1, 1, 1, 1, 1, 1];

function MidlePart() {
  const dispatch = useDispatch();
  const { auth, post } = useSelector((store) => store);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

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
              placeholder={`What's on your mind, ${auth.user?.firstName}?`}
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

      {/* Create Post Modal */}
      <CreatePostModal 
        open={showCreatePostModal} 
        onClose={handleCloseCreatePostModal}
        user={auth.user}
      />

      {/* Posts Section */}
      <div className="space-y-6">
        {post.loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          post.posts?.map((postItem, index) => (
            <PostCard key={postItem.id || index} post={postItem} />
          ))
        )}
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