import React, { useState, useEffect } from 'react';
import { Avatar, Card, IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useSelector } from 'react-redux';

const Message = () => {
  const { auth } = useSelector((store) => store);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      user: { firstName: 'John', lastName: 'Doe', avatar: null },
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      user: { firstName: 'Sarah', lastName: 'Wilson', avatar: null },
      lastMessage: 'Thanks for sharing that article!',
      timestamp: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      user: { firstName: 'Mike', lastName: 'Johnson', avatar: null },
      lastMessage: 'See you tomorrow at the meeting',
      timestamp: '3 hours ago',
      unread: 1,
      online: true
    }
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      senderId: 1,
      content: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: auth.user?.id,
      content: 'I\'m doing great! Thanks for asking. How about you?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      content: 'I\'m good too! Working on some exciting projects.',
      timestamp: '10:35 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would dispatch an action to send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar - Conversations List */}
      <div className="w-full sm:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                backgroundColor: 'rgba(249, 250, 251, 0.8)',
              }
            }}
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                selectedChat?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="relative">
                <Avatar
                  sx={{ width: 48, height: 48 }}
                  src={conversation.user.avatar}
                >
                  {conversation.user.firstName[0]}
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {conversation.user.firstName} {conversation.user.lastName}
                  </h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center">
              <Avatar
                sx={{ width: 40, height: 40 }}
                src={selectedChat.user.avatar}
              >
                {selectedChat.user.firstName[0]}
              </Avatar>
              <div className="ml-3">
                <h2 className="font-semibold text-gray-900">
                  {selectedChat.user.firstName} {selectedChat.user.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.online ? 'Active now' : 'Last seen 2 hours ago'}
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <IconButton className="text-gray-500 hover:text-gray-700">
                  <AttachFileIcon />
                </IconButton>
                <IconButton className="text-gray-500 hover:text-gray-700">
                  <EmojiEmotionsIcon />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    }
                  }}
                />
                <IconButton
                  type="submit"
                  disabled={!message.trim()}
                  className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                >
                  <SendIcon />
                </IconButton>
              </form>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
              <p className="text-gray-600">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message
