import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="mb-4">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
    </div>
  );
};

export default SearchUsers;