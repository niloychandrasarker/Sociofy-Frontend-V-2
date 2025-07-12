import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const PostCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card
      className="rounded-2xl border-0 shadow-card bg-white/95 backdrop-blur-lg hover-lift mb-6"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
            }}
            aria-label="user avatar"
            className="ring-2 ring-gray-100"
          >
            R
          </Avatar>
        }
        action={
          <IconButton 
            aria-label="settings"
            className="hover:bg-gray-100 transition-colors"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title="Code With Niloy"
        subheader="@CodeWithNiloy • 2h"
        titleTypographyProps={{ 
          fontSize: { xs: "1.1rem", sm: "1.25rem" }, 
          fontWeight: 600,
          className: "text-gray-900"
        }}
        subheaderTypographyProps={{ 
          fontSize: { xs: "0.9rem", sm: "1rem" },
          className: "text-gray-500"
        }}
        className="pb-3"
      />

      {/* Content */}
      <CardContent className="pt-0 pb-4">
        <Typography
          variant="body1"
          sx={{ 
            color: "text.primary", 
            whiteSpace: "pre-line",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            lineHeight: 1.6
          }}
          className="text-gray-800 font-body"
        >
          {`This impressive paella is a perfect party dish and a fun meal to cook together with your guests. 🥘✨

Add 1 cup of frozen peas along with the mussels, if you like. The combination of flavors is absolutely amazing! 

#cooking #paella #foodie #delicious`}
        </Typography>
      </CardContent>

      {/* Media */}
      <CardMedia
        component="img"
        sx={{ 
          height: { xs: 250, sm: 300, md: 350 },
          objectFit: "cover"
        }}
        image="https://cdn.pixabay.com/photo/2024/12/18/01/27/lightning-9274136_640.jpg"
        alt="Delicious paella dish"
        className="hover:scale-105 transition-transform duration-500"
      />

      {/* Actions */}
      <CardActions className="flex justify-between px-4 py-3" disableSpacing>
        <div className="flex items-center space-x-1">
          <IconButton
            onClick={handleLike}
            className={`hover:bg-red-50 transition-all duration-200 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            aria-label="like post"
          >
            {isLiked ? (
              <FavoriteIcon className="hover:scale-110 transition-transform" />
            ) : (
              <FavoriteBorderIcon className="hover:scale-110 transition-transform" />
            )}
          </IconButton>
          
          <IconButton
            className="hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200"
            aria-label="comment"
          >
            <CommentIcon className="hover:scale-110 transition-transform" />
          </IconButton>
          
          <IconButton
            className="hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-200"
            aria-label="share"
          >
            <ShareIcon className="hover:scale-110 transition-transform" />
          </IconButton>
        </div>

        <IconButton
          onClick={handleBookmark}
          className={`hover:bg-yellow-50 transition-all duration-200 ${isBookmarked ? 'text-yellow-600' : 'text-gray-600'}`}
          aria-label="bookmark"
        >
          {isBookmarked ? (
            <BookmarkAddIcon className="hover:scale-110 transition-transform" />
          ) : (
            <BookmarkBorderIcon className="hover:scale-110 transition-transform" />
          )}
        </IconButton>
      </CardActions>

      {/* Like count and comments preview */}
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium">
            {likeCount} likes
          </span>
          <span>24 comments</span>
          <span>5 shares</span>
        </div>
        
        {/* Add comment input */}
        <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
          <Avatar 
            sx={{ width: 32, height: 32 }}
            className="ring-1 ring-gray-200"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 outline-none rounded-full px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300 transition-all duration-200 text-sm"
          />
        </div>
      </div>
    </Card>
  );
};

export default PostCard;