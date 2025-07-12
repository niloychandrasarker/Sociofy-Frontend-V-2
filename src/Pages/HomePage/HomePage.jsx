import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MidlePart from "../../Compunenet/MidlePart/MidlePart";
import Reels from "../../Compunenet/Reels/Reels";
import CreateReels from "../../Compunenet/Reels/CreateReels";
import Profile from "../Profile/Profile";
import HomeRight from "../../Compunenet/HomeRight/HomeRight";
import Sidebar from "../../Compunenet/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import store from "../../Redux/store";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store)

  console.log("Auth ", auth);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-display text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sociofy
          </h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex w-full h-screen pt-16 lg:pt-0">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>

        {/* Middle Content - Scrollable and scrollbar hidden */}
        <div className="flex-1 overflow-y-auto h-screen no-scrollbar">
          <div className="w-full pl-3 pr-1 sm:pl-4 sm:pr-2 lg:pl-5 lg:pr-2 xl:pl-6 xl:pr-3">
            <Routes>
              <Route path="/" element={<MidlePart />} />
              <Route path="reels" element={<Reels />} />
              <Route path="create-reels" element={<CreateReels />} />
              <Route path="profile/:id" element={<Profile />} />
            </Routes>
          </div>
        </div>

        {/* Right Sidebar */}
        {location.pathname === "/" && (
         <div className="hidden sm:block sm:w-80 lg:w-96 xl:w-[30rem] flex-shrink-0">
    <div className="sticky top-0 h-screen overflow-y-auto custom-scrollbar">
      <HomeRight />
    </div>
  </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center py-2 px-2 safe-area-inset-bottom">
          {[
            { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home" },
            { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Explore" },
            { icon: "M12 4v16m8-8H4", label: "Create" },
            { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages" },
            { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Profile" },
          ].map(({ icon, label }) => (
            <button key={label} className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors min-w-0 flex-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span className="text-xs mt-1 truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
