/** @format */

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GetAllTrains from "../components/admin/getAllTrains";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [trainList, setTrainList] = useState([]);
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [arrivalTimeAtSource, setArrivalTimeAtSource] = useState("00:00");
  const [arrivalTimeAtDestination, setArrivalTimeAtDestination] =
    useState("00:00");

  const handleOpen = () => setOpen(!open);

  // Fetch all trains from the server
  const fetchTrains = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/trains/all-trains"
      );
      setTrainList(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch trains:", err.message);
    }
  };

  // Fetch trains on component mount
  useEffect(() => {
    fetchTrains();
  }, []);

  const handleAddTrain = async () => {
    // Input validation before API call
    console.log(trainName,arrivalTimeAtSource,arrivalTimeAtDestination)
    if (
      !trainName ||
      !source ||
      !destination ||
      !seatCapacity ||
      !arrivalTimeAtSource ||
      !arrivalTimeAtDestination
    ) {
      alert("Please fill in all fields");
      return;
    }
    // Optional: Validate seat capacity is a positive number
    if (isNaN(seatCapacity) || Number(seatCapacity) <= 0) {
      alert("Seat capacity must be a positive number");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7000/api/trains/new-create",
        {
          train_name: trainName,
          source: source,
          destination: destination,
          seat_capacity: Number(seatCapacity), // Ensure it's a number
          arrival_time_at_source: arrivalTimeAtSource,
          arrival_time_at_destination: arrivalTimeAtDestination,
        }
      );

      if (response.data.success) {
        console.log("Train added successfully:", response.data.data.trainid);

        // Reset fields after successful submission
        setTrainName("");
        setSource("");
        setDestination("");
        setSeatCapacity("");
        setArrivalTimeAtSource("00:00");
        setArrivalTimeAtDestination("00:00");

        // Close modal
        handleOpen();

        // Fetch updated train list
        fetchTrains();
      }
    } catch (error) {
      console.error(
        "Error adding train:",
        error.response?.data?.message || error.message
      );

      // More specific error handling
      if (error.response) {
        alert(error.response.data.message || "Failed to add train");
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Error in request setup. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between pl-[2vw] pr-[2vw] border-b-2 p-6 items-center bg-[#213D77] text-white rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">All Trains...</h1>
        <Button
          onClick={handleOpen}
          variant="gradient"
          color="white"
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold">
          Add New Train
        </Button>

        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Add Train Details
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="absolute right-3.5 top-3.5"
              onClick={handleOpen}>
              <XMarkIcon className="h-4 w-4" />
            </IconButton>
          </DialogHeader>

          <DialogBody className="space-y-4 pb-6">
            {/* Train Name */}
            <Input
              label="Train Name"
              placeholder="e.g., Express Train"
              value={trainName}
              onChange={(e) => setTrainName(e.target.value)}
            />

            {/* Source and Destination */}
            <div className="flex gap-4">
              <Input
                label="Source"
                placeholder="e.g., City A"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <Input
                label="Destination"
                placeholder="e.g., City B"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Seat Capacity */}
            <Input
              label="Seat Capacity"
              placeholder="e.g., 150"
              value={seatCapacity}
              onChange={(e) => setSeatCapacity(e.target.value)}
            />

            {/* Arrival Times */}
            <div className="flex gap-4">
              <Input
                label="Arrival Time at Source"
                type="time"
                value={arrivalTimeAtSource}
                onChange={(e) => setArrivalTimeAtSource(e.target.value)}
              />
              <Input
                label="Arrival Time at Destination"
                type="time"
                value={arrivalTimeAtDestination}
                onChange={(e) => setArrivalTimeAtDestination(e.target.value)}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button onClick={handleAddTrain}>Add Train</Button>
          </DialogFooter>
        </Dialog>
      </div>
      <GetAllTrains trainList={trainList} />
    </>
  );
};

export default AdminDashboard;
