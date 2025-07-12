import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';
import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const CreatePostModal = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    caption: '',
    image: '',
    video: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.caption.trim()) return;

    setIsLoading(true);
    try {
      await dispatch(createPostAction(postData));
      setPostData({ caption: '', image: '', video: '', location: '' });
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Create post</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar 
              sx={{ width: 48, height: 48 }}
              src={user?.avatar || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
              className="ring-2 ring-gray-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <div className="flex items-center space-x-1 mt-1">
                <button 
                  type="button"
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
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
            name="caption"
            value={postData.caption}
            onChange={handleInputChange}
            placeholder={`What's on your mind, ${user?.firstName}?`}
            className="w-full h-32 resize-none outline-none text-lg placeholder-gray-400 bg-transparent"
            autoFocus
            required
          />

          {/* Media Upload */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group cursor-pointer">
                <ImageIcon className="text-green-500 group-hover:text-green-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Add Photo</span>
                <input
                  type="url"
                  name="image"
                  value={postData.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="hidden"
                />
              </label>
              {postData.image && (
                <input
                  type="url"
                  name="image"
                  value={postData.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full mt-2 p-2 border border-gray-200 rounded-lg text-sm"
                />
              )}
            </div>
            <div>
              <label className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group cursor-pointer">
                <VideocamIcon className="text-purple-500 group-hover:text-purple-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Add Video</span>
                <input
                  type="url"
                  name="video"
                  value={postData.video}
                  onChange={handleInputChange}
                  placeholder="Video URL"
                  className="hidden"
                />
              </label>
              {postData.video && (
                <input
                  type="url"
                  name="video"
                  value={postData.video}
                  onChange={handleInputChange}
                  placeholder="Video URL"
                  className="w-full mt-2 p-2 border border-gray-200 rounded-lg text-sm"
                />
              )}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <LocationOnIcon className="text-red-500 text-lg" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={postData.location}
                  onChange={handleInputChange}
                  placeholder="Add location"
                  className="font-medium text-gray-700 bg-transparent outline-none flex-1"
                />
              </div>
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

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading || !postData.caption.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </div>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;