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
import { useDispatch, useSelector } from "react-redux";
import { likePostAction, createCommentAction, savePostAction } from "../../Redux/Post/post.action";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    dispatch(likePostAction(post.id));
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    dispatch(savePostAction(post.id));
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(createCommentAction(post.id, { content: commentText }));
      setCommentText('');
    }
  };

  // Fallback data for demo
  const postData = post || {
    id: 1,
    caption: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. 🥘✨\n\nAdd 1 cup of frozen peas along with the mussels, if you like. The combination of flavors is absolutely amazing!\n\n#cooking #paella #foodie #delicious",
    image: "https://cdn.pixabay.com/photo/2024/12/18/01/27/lightning-9274136_640.jpg",
    user: {
      firstName: "Code With",
      lastName: "Niloy",
      avatar: null
    },
    likes: [],
    comments: [],
    createdAt: new Date().toISOString()
  };

  const isPostLiked = postData.likes?.some(like => like.userId === auth.user?.id) || isLiked;
  const likeCount = postData.likes?.length || 42;
  const commentCount = postData.comments?.length || 24;

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
            src={postData.user?.avatar}
          >
            {postData.user?.firstName?.[0] || 'U'}
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
        title={`${postData.user?.firstName || 'User'} ${postData.user?.lastName || ''}`}
        subheader={`@${(postData.user?.firstName + postData.user?.lastName)?.replace(/\s+/g, '').toLowerCase() || 'user'} • ${new Date(postData.createdAt).toLocaleDateString()}`}
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
          {postData.caption}
        </Typography>
      </CardContent>

      {/* Media */}
      {postData.image && (
        <CardMedia
          component="img"
          sx={{ 
            height: { xs: 250, sm: 300, md: 350 },
            objectFit: "cover"
          }}
          image={postData.image}
          alt="Post content"
          className="hover:scale-105 transition-transform duration-500"
        />
      )}
      
      {postData.video && (
        <CardMedia
          component="video"
          sx={{ 
            height: { xs: 250, sm: 300, md: 350 },
            objectFit: "cover"
          }}
          src={postData.video}
          controls
          className="hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Actions */}
      <CardActions className="flex justify-between px-4 py-3" disableSpacing>
        <div className="flex items-center space-x-1">
          <IconButton
            onClick={handleLike}
            className={`hover:bg-red-50 transition-all duration-200 ${isPostLiked ? 'text-red-500' : 'text-gray-600'}`}
            aria-label="like post"
          >
            {isPostLiked ? (
              <FavoriteIcon className="hover:scale-110 transition-transform" />
            ) : (
              <FavoriteBorderIcon className="hover:scale-110 transition-transform" />
            )}
          </IconButton>
          
          <IconButton
            onClick={() => setShowComments(!showComments)}
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
          <span>{commentCount} comments</span>
          <span>5 shares</span>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
            {postData.comments?.map((comment, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Avatar sx={{ width: 28, height: 28 }} />
                <div className="flex-1 bg-gray-50 rounded-lg p-2">
                  <p className="font-medium text-sm">{comment.user?.firstName}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add comment input */}
        <form onSubmit={handleComment} className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
          <Avatar 
            sx={{ width: 32, height: 32 }}
            src={auth.user?.avatar}
            className="ring-1 ring-gray-200"
          >
            {auth.user?.firstName?.[0] || 'U'}
          </Avatar>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 outline-none rounded-full px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300 transition-all duration-200 text-sm"
          />
          {commentText.trim() && (
            <button
              type="submit"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </Card>
  );
};

export default PostCard;