import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsersAction } from '../../Redux/User/user.action';
import { Avatar } from '@mui/material';

const SearchUsers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 2) {
      dispatch(searchUsersAction(value));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  return (
    <div className="mb-4 relative">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => searchTerm.length > 2 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-400" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 3,
            backgroundColor: 'rgba(249, 250, 251, 0.8)',
            backdropFilter: 'blur(10px)',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(229, 231, 235, 0.8)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(59, 130, 246, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #3b82f6',
            },
            transition: 'all 0.2s ease',
          }
        }}
        size="medium"
        className="hover:shadow-md transition-shadow duration-200"
      />
      
      {/* Search Results Dropdown */}
      {showResults && user.searchResults?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          {user.searchResults.map((searchUser, index) => (
            <div
              key={searchUser.id || index}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => {
                setSearchTerm('');
                setShowResults(false);
              }}
            >
              <Avatar
                sx={{ width: 40, height: 40 }}
                src={searchUser.avatar}
              >
                {searchUser.firstName?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {searchUser.firstName} {searchUser.lastName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  @{searchUser.username || (searchUser.firstName + searchUser.lastName)?.replace(/\s+/g, '').toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;