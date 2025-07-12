import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../Compunenet/Post/PostCard";
import UserReelsCard from "../../Compunenet/Reels/UserReelsCard";
import ProfileModal from "./ProfileModal";
import { getUserPostsAction } from "../../Redux/Post/post.action";
import { getUserByIdAction } from "../../Redux/User/user.action";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const reels = [1, 1, 1, 1, 1, 1, 1, 1];
const savedPost = [1, 1, 1, 1, 1, 1, 1];

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("post");
  const [openEdit, setOpenEdit] = React.useState(false);
  const { auth, post, user } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdAction(id));
      dispatch(getUserPostsAction(id));
    }
  }, [dispatch, id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Determine if viewing own profile or another user's profile
  const isOwnProfile = auth.user?.id?.toString() === id;
  const profileUser = isOwnProfile ? auth.user : user.selectedUser;
  const userPosts = post.userPosts || [];

  // User info
  const fullName =
    (profileUser?.firstName || "") + " " + (profileUser?.lastName || "");
  const username = (profileUser?.firstName + profileUser?.lastName)
    ?.replace(/\s+/g, "")
    .toLowerCase();
  const avatarSrc =
    profileUser?.avatar ||
    "https://cdn.pixabay.com/photo/2023/04/27/10/22/cat-7954262_640.jpg";
  const bio = profileUser?.bio || "Welcome to my profile!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-4xl my-8">
        {/* Profile Card */}
        <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 sm:h-56 md:h-64 w-full relative">
            <img
              className="w-full h-full object-cover"
              src={
                profileUser?.cover ||
                "https://media.istockphoto.com/id/468621254/photo/encircling-sun.jpg?s=612x612&w=0&k=20&c=yw9bFGrjfAySY8b3jOwHN635IyvzskDiqL0C0jpLGFU="
              }
              alt="cover"
            />
            {/* Avatar */}
            <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-10">
              <Avatar
                sx={{
                  width: { xs: 96, sm: 128, md: 160 },
                  height: { xs: 96, sm: 128, md: 160 },
                  border: "5px solid white",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                }}
                src={avatarSrc}
              />
            </div>
          </div>
          {/* Profile Info */}
          <div className="pt-20 pb-6 px-4 sm:px-8 flex flex-col items-center bg-white">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">
              {fullName.trim() || "User Name"}
            </h1>
            <p className="text-gray-500 mb-2 text-sm sm:text-base">
              @{username || "username"}
            </p>
            <div className="flex gap-6 items-center py-3 text-gray-700 text-sm sm:text-base">
              <span>
                <b>{profileUser?.postsCount ?? userPosts.length}</b> Posts
              </span>
              <span>
                <b>{profileUser?.followers ?? 35}</b> Followers
              </span>
              <span>
                <b>{profileUser?.following ?? 5}</b> Following
              </span>
            </div>
            <p className="text-center text-gray-600 max-w-xl mb-4">{bio}</p>
            {isOwnProfile ? (
              <Button
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  boxShadow: "none",
                  background: "linear-gradient(90deg, #2563eb 0%, #6366f1 100%)",
                }}
                variant="contained"
                onClick={() => setOpenEdit(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  boxShadow: "none",
                  background: "linear-gradient(90deg, #2563eb 0%, #6366f1 100%)",
                }}
                variant="contained"
              >
                Follow
              </Button>
            )}
          </div>
        </div>

        {/* Tabs and Content */}
        <section className="mt-8 bg-white rounded-xl shadow p-4 sm:p-6">
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((item) => (
                <Tab key={item.value} value={item.value} label={item.name} />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" && (
              <div className="space-y-5 w-full max-w-2xl my-10">
                {post.loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : userPosts.length > 0 ? (
                  userPosts.map((postItem, idx) => (
                    <div
                      key={postItem.id || idx}
                      className="border border-slate-100 rounded-md shadow-sm bg-white"
                    >
                      <PostCard post={postItem} />
                    </div>
                  ))
                ) : (
                  <div
                    className="text-center py-12 text-gray-500"
                  >
                    <p className="text-lg">No posts yet</p>
                    <p className="text-sm">Share your first post to get started!</p>
                  </div>
                )}
              </div>
            )}
            {value === "reels" && (
              <div className="flex justify-center flex-wrap gap-4 my-10 w-full max-w-4xl">
                {reels.map((item, idx) => (
                  <UserReelsCard key={idx} />
                ))}
              </div>
            )}
            {value === "saved" && (
              <div className="space-y-5 w-full max-w-2xl my-10">
                {savedPost.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-100 rounded-md shadow-sm bg-white"
                  >
                    <PostCard />
                  </div>
                ))}
              </div>
            )}
            {value === "repost" && (
              <div className="text-gray-500 my-10">No reposts yet.</div>
            )}
          </div>
        </section>
        {isOwnProfile && (
          <ProfileModal open={openEdit} handleClose={() => setOpenEdit(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
