import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Card, IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useSelector, useDispatch } from 'react-redux';
import { getUserChatsAction, createChatAction } from '../../Redux/Chat/chat.action';
import { getChatMessagesAction, createMessageAction, messageReadAction } from '../../Redux/Message/message.action';
import WebSocketService from '../../Config/websocket';

const Message = () => {
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Load user chats on component mount
    dispatch(getUserChatsAction());
  }, [dispatch]);

  useEffect(() => {
    // Load messages when a chat is selected
    if (selectedChat) {
      dispatch(getChatMessagesAction(selectedChat.id));
      WebSocketService.joinChat(selectedChat.id);
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    scrollToBottom();
  }, [message.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChatSelect = (chatData) => {
    if (selectedChat) {
      WebSocketService.leaveChat(selectedChat.id);
    }
    setSelectedChat(chatData);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedChat) {
      try {
        const messageData = {
          chatId: selectedChat.id,
          content: messageText,
        };
        
        await dispatch(createMessageAction(messageData));
        setMessageText('');
        
        // Stop typing indicator
        if (isTyping) {
          WebSocketService.stopTyping(selectedChat.id);
          setIsTyping(false);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
    
    if (selectedChat && !isTyping) {
      setIsTyping(true);
      WebSocketService.startTyping(selectedChat.id);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (selectedChat && isTyping) {
        WebSocketService.stopTyping(selectedChat.id);
        setIsTyping(false);
      }
    }, 1000);
  };

  const handleMessageRead = (messageId) => {
    dispatch(messageReadAction(messageId));
  };

  const isUserOnline = (userId) => {
    return message.onlineUsers.includes(userId);
  };

  const isUserTyping = (chatId) => {
    return message.typingUsers[chatId]?.length > 0;
  };

  const filteredChats = chat.chats.filter(chatItem =>
    chatItem.users.some(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentChatMessages = selectedChat ? message.messages[selectedChat.id] || [] : [];

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
          {chat.loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            filteredChats.map((conversation) => {
              const otherUser = conversation.users.find(user => user.id !== auth.user?.id);
              const lastMessage = conversation.lastMessage;
              const unreadCount = conversation.unreadCount || 0;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => handleChatSelect(conversation)}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                    selectedChat?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar
                      sx={{ width: 48, height: 48 }}
                      src={otherUser?.avatar}
                    >
                      {otherUser?.firstName?.[0]}
                    </Avatar>
                    {isUserOnline(otherUser?.id) && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {otherUser?.firstName} {otherUser?.lastName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {lastMessage?.timestamp ? new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {isUserTyping(conversation.id) ? (
                          <span className="text-blue-600 italic">Typing...</span>
                        ) : (
                          lastMessage?.content || 'Start a conversation'
                        )}
                      </p>
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center">
              {(() => {
                const otherUser = selectedChat.users.find(user => user.id !== auth.user?.id);
                return (
                  <>
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      src={otherUser?.avatar}
                    >
                      {otherUser?.firstName?.[0]}
                    </Avatar>
                    <div className="ml-3">
                      <h2 className="font-semibold text-gray-900">
                        {otherUser?.firstName} {otherUser?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {isUserOnline(otherUser?.id) ? (
                          <span className="text-green-600">Active now</span>
                        ) : (
                          'Last seen recently'
                        )}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {message.loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                currentChatMessages.map((msg) => {
                  const isOwn = msg.senderId === auth.user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      onClick={() => !isOwn && handleMessageRead(msg.id)}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p
                            className={`text-xs ${
                              isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          {isOwn && (
                            <span className={`text-xs ${
                              msg.status === 'read' ? 'text-blue-200' : 
                              msg.status === 'delivered' ? 'text-blue-300' : 'text-blue-400'
                            }`}>
                              {msg.status === 'read' ? '✓✓' : 
                               msg.status === 'delivered' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {/* Typing Indicator */}
              {isUserTyping(selectedChat.id) && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
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
                  value={messageText}
                  onChange={handleTyping}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    }
                  }}
                />
                <IconButton
                  type="submit"
                  disabled={!messageText.trim()}
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

export default Message;