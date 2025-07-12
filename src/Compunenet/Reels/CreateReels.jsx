import React, { useState } from 'react';
import { Card, Button, TextField, Avatar, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideocamIcon from '@mui/icons-material/Videocam';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FilterIcon from '@mui/icons-material/Filter';
import { useSelector } from 'react-redux';

const CreateReels = () => {
  const { auth } = useSelector((store) => store);
  const [reelData, setReelData] = useState({
    videoUrl: '',
    caption: '',
    music: '',
    filter: 'none'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setReelData({
      ...reelData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reelData.videoUrl.trim() || !reelData.caption.trim()) return;

    setIsLoading(true);
    try {
      // Here you would dispatch an action to create the reel
      console.log('Creating reel:', reelData);
      // Reset form
      setReelData({ videoUrl: '', caption: '', music: '', filter: 'none' });
    } catch (error) {
      console.error('Error creating reel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filters = [
    { name: 'None', value: 'none' },
    { name: 'Vintage', value: 'vintage' },
    { name: 'Bright', value: 'bright' },
    { name: 'Dramatic', value: 'dramatic' },
    { name: 'Warm', value: 'warm' },
    { name: 'Cool', value: 'cool' }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Reel</h1>
          <p className="text-gray-600">Share your creativity with the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Video</h2>
            
            {/* Video Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-blue-400 transition-colors">
              {reelData.videoUrl ? (
                <div className="space-y-4">
                  <video
                    src={reelData.videoUrl}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                  <Button
                    variant="outlined"
                    onClick={() => setReelData({ ...reelData, videoUrl: '' })}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Remove Video
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <CloudUploadIcon className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your video</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Drag and drop or click to browse
                    </p>
                    <TextField
                      fullWidth
                      name="videoUrl"
                      value={reelData.videoUrl}
                      onChange={handleInputChange}
                      placeholder="Or paste video URL here"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Video Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                variant="outlined"
                startIcon={<VideocamIcon />}
                className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Record Video
              </Button>
              <Button
                variant="outlined"
                startIcon={<MusicNoteIcon />}
                className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Add Music
              </Button>
            </div>

            {/* Music Input */}
            <TextField
              fullWidth
              name="music"
              value={reelData.music}
              onChange={handleInputChange}
              placeholder="Add background music (URL or name)"
              variant="outlined"
              size="small"
              className="mb-6"
            />

            {/* Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <FilterIcon className="mr-2" />
                Filters
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setReelData({ ...reelData, filter: filter.value })}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      reelData.filter === filter.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Details Section */}
          <Card className="p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Reel Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-6">
                <Avatar
                  sx={{ width: 48, height: 48 }}
                  src={auth.user?.avatar}
                >
                  {auth.user?.firstName?.[0] || 'U'}
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {auth.user?.firstName} {auth.user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    @{(auth.user?.firstName + auth.user?.lastName)?.replace(/\s+/g, '').toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="caption"
                  value={reelData.caption}
                  onChange={handleInputChange}
                  placeholder="Write a caption for your reel... Use hashtags to reach more people!"
                  variant="outlined"
                  required
                />
              </div>

              {/* Privacy Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who can see this reel?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      defaultChecked
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Public - Anyone can see</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      value="followers"
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Followers only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Only me</span>
                  </label>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Allow comments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Allow sharing</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Show in explore</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button
                  variant="outlined"
                  fullWidth
                  className="py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading || !reelData.videoUrl.trim() || !reelData.caption.trim()}
                  className="py-3 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Publishing...' : 'Publish Reel'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for creating great reels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Keep it short</h4>
                <p className="text-sm text-gray-600">15-30 seconds work best for engagement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Use trending music</h4>
                <p className="text-sm text-gray-600">Popular songs help your reel reach more people</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Add hashtags</h4>
                <p className="text-sm text-gray-600">Use relevant hashtags to increase discoverability</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateReels
