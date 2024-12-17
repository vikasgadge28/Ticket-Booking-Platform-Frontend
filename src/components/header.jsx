/** @format */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ShieldCheckIcon,
  HomeIcon,
  BookmarkSquareIcon
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthModals from "../views/loginSignUpModals";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, [isAuthModalOpen]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole("");
    closeDrawer();
    navigate("/"); // Navigate to home page after logout
  };

  const handleOpenAuthModal = () => {
    setAuthModalOpen(true);
    closeDrawer();
  };

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center bg-blue-700 text-white p-4 shadow-lg">
      {/* Logo and Title Container */}
      <div className="flex items-center space-x-4">
        <img
          src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png"
          alt="IRCTC Logo"
          className="h-10 w-10"
        />
        <Typography variant="h5" className="text-white font-bold">
          Train Booking System
        </Typography>
      </div>
      <div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Home Button */}
          <Tooltip content="Home">
            <IconButton
              variant="text"
              color="white"
              onClick={() => navigate("/")}
              className="hover:bg-blue-700">
              <HomeIcon className="h-6 w-6" />
            </IconButton>
          </Tooltip>

          {/* Admin Panel Button (Conditional) */}
          {isLoggedIn && userRole === "admin" && (
            <Tooltip content="Admin Panel">
              <IconButton
                variant="text"
                color="white"
                onClick={() => navigate("/admin")}
                className="hover:bg-blue-700">
                <ShieldCheckIcon className="h-6 w-6 text-yellow-300" />
              </IconButton>
            </Tooltip>
          )}

          {/* Login/Logout Buttons */}
          {!isLoggedIn ?
            <Tooltip content="Login">
              <IconButton
                variant="text"
                color="white"
                onClick={handleOpenAuthModal}
                className="hover:bg-blue-700">
                <UserCircleIcon className="h-6 w-6" />
              </IconButton>
            </Tooltip>
          : <Tooltip content="Logout">
              <IconButton
                variant="text"
                color="white"
                onClick={handleLogout}
                className="hover:bg-blue-700">
                <PowerIcon className="h-6 w-6 text-red-300" />
              </IconButton>
            </Tooltip>
          }

          {/* Drawer Toggle */}
          <IconButton
            variant="text"
            color="white"
            onClick={openDrawer}
            className="hover:bg-blue-700">
            {isDrawerOpen ?
              <XMarkIcon className="h-6 w-6" />
            : <Bars3Icon className="h-6 w-6" />}
          </IconButton>
        </div>

        {/* Drawer Sidebar */}
        <Drawer open={isDrawerOpen} onClose={closeDrawer} placement="right">
          <Card color="white" shadow={false} className="h-full w-full p-4">
            <div className="mb-4 flex items-center gap-4 p-4 bg-blue-600 text-white rounded-lg">
              <UserCircleIcon className="h-8 w-8" />
              <Typography variant="h5" color="white">
                {isLoggedIn ? "User Menu" : "Menu"}
              </Typography>
            </div>

            <List>
              {!isLoggedIn ?
                <>
                  <ListItem onClick={handleOpenAuthModal}>
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Login
                  </ListItem>
                  <ListItem onClick={handleOpenAuthModal}>
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Sign Up
                  </ListItem>
                </>
              : <>
                  {userRole === "admin" && (
                    <ListItem onClick={() => navigate("/admin")}>
                      <ListItemPrefix>
                        <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                      </ListItemPrefix>
                      Admin Panel
                    </ListItem>
                  )}

                  <ListItem onClick={() => navigate("/bookings")}>
                    <ListItemPrefix>
                      
                      <BookmarkSquareIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                   Bookings
                  </ListItem>
                  <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                      <PowerIcon className="h-5 w-5 text-red-600" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
                </>
              }
            </List>
          </Card>
        </Drawer>

        {/* Auth Modal Component */}
        <AuthModals open={isAuthModalOpen} setOpen={setAuthModalOpen} />
      </div>
    </div>
  );
};

export default Header;
