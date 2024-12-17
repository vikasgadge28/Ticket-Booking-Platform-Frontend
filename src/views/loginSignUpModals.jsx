/** @format */

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AuthModals = ({ open, setOpen }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();
  const handleOpen = () => setOpen((cur) => !cur);

  const toggleFormType = () => {
    setIsRegister((cur) => !cur);
    setError(null);
    setRegistrationError(null);
    setUsername(""); // Clear username on toggle
    setEmail(""); // Clear email on toggle
    setPassword(""); // Clear password on toggle
  };
const handleLogin = async () => {
    try {
      // Input validation
      if (!username || !password) {
        setError("Username and password are required");
        return;
      }

      const response = await axios.post("http://localhost:7000/api/login", {
        username,
        password,
      });

      if (response.data.success) {
          // Save user data in local storage
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data)
        );
     
   
        if (response.data.data.role === "admin") {
          navigate("/admin");
          handleOpen();
        } else {
          handleOpen(); // Close the modal
        }
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data?.message || "An error occurred"
      );
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleRegister = async () => {
    try {
      // Input validation
      if (!username || !email || !password) {
        setRegistrationError("All fields are required for registration");
        return;
      }

      // Basic email format validation (can be enhanced)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setRegistrationError("Please enter a valid email address");
        return;
      }

      const response = await axios.post("http://localhost:7000/api/signup", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        console.log("Registration successful:", response.data);
        setIsRegister(false);
        setError(null);
        setRegistrationError(null);
        setUsername("")
        setPassword("")
        // Open the modal to show login form
      }
    } catch (err) {
      console.error(
        "Registration error:",
        err.response?.data?.message || "An error occurred"
      );
      setRegistrationError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {isRegister ? "Register" : "Log In"}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray">
              {isRegister ?
                "Enter your details to create an account."
              : "Enter your username and password to log in."}
            </Typography>

            {/* Username field for both login and registration */}
            <Typography className="-mb-2" variant="h6">
              Your Username
            </Typography>
            <Input
              label="Username"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {isRegister && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Your Email
                </Typography>
                <Input
                  label="Email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input
              label="Password"
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isRegister && (
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            )}

            {error && (
              <Typography variant="small" color="red" className="text-center">
                {error}
              </Typography>
            )}

            {registrationError && (
              <Typography variant="small" color="red" className="text-center">
                {registrationError}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={isRegister ? handleRegister : handleLogin}
              fullWidth>
              {isRegister ? "Register" : "Log In"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              {isRegister ?
                "Already have an account?"
              : "Don't have an account?"}
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={toggleFormType}>
                {isRegister ? "Log in" : "Register"}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default AuthModals;
