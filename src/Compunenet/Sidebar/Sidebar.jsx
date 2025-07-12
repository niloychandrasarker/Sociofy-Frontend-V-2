import React from "react";
import Avatar from "@mui/material/Avatar";
import { navigationMenu } from "./sidebarmenu.jsx";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const handleNavigation = (item) => {
  if (item.title === "Profile") {
    navigate(`/profile/${auth.user?.id}`);
  } else if (item.path) {
    navigate(item.path);
  }
};

  return (
    <Card
      className="h-screen flex flex-col justify-between py-6 shadow-elegant border-0 bg-white/95 backdrop-blur-lg"
      sx={{
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        borderRadius: 0,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="space-y-8 px-4 xl:px-6 flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="pt-2">
          <h1 className="font-display text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sociofy
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {navigationMenu.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item)}
              className="w-full flex items-center space-x-3 xl:space-x-4 p-3 xl:p-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-left group hover-lift"
            >
              <div className="text-gray-600 group-hover:text-blue-600 transition-colors flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-base xl:text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="px-4 xl:px-6 flex-shrink-0">
        <Divider className="my-6 opacity-60" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              sx={{ width: 48, height: 48 }}
              className="ring-2 ring-blue-100 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                @
                {(auth.user?.firstName + auth.user?.lastName)
                  ?.replace(/\s+/g, "")
                  .toLowerCase()}
              </p>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="More options"
          >
            <MoreVertIcon className="text-gray-600" />
          </button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                mt: 1,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              className="hover:bg-blue-50 transition-colors"
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              className="hover:bg-blue-50 transition-colors"
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              className="hover:bg-red-50 text-red-600 transition-colors"
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
