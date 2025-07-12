import React from 'react';
import SearchUsers from '../SearchUser/SearchUsers';
import PopularUserCard from './PopularUserCard';
import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularUsersAction } from '../../Redux/User/user.action';


const HomeRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPopularUsersAction());
  }, [dispatch]);

  return (
    <div className="w-full h-full p-4 lg:p-6 space-y-6 overflow-y-auto">
      {/* Search Section */}
      <SearchUsers />
      
      {/* Trending Topics */}
      <Card className="p-4 lg:p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Trending</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {['#ReactJS', '#WebDevelopment', '#JavaScript', '#TechNews'].map((tag, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div>
                <p className="font-medium text-gray-900">{tag}</p>
                <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10}K posts</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested Users */}
      <Card className="p-4 lg:p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Suggested for you</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {user.loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) :
            user.popularUsers?.slice(0, 5).map((userItem, index) => (
              <PopularUserCard key={userItem.id || index} user={userItem} />
            ))
          }
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4 lg:p-6 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Posts this week</span>
            <span className="font-semibold text-blue-600">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Likes received</span>
            <span className="font-semibold text-green-600">248</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">New followers</span>
            <span className="font-semibold text-purple-600">15</span>
          </div>
        </div>
      </Card>

      {/* Mobile-only: Quick Actions */}
      <div className="block sm:hidden">
        <Card className="p-4 rounded-2xl shadow-card border-0 bg-white/95 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
              <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">Find Friends</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 transition-colors">
              <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-medium">Saved Posts</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeRight;