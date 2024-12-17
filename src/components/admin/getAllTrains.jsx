import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const GetAllTrains = ({ trainList }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [newSeats, setNewSeats] = useState(null);
  const [error, setError] = useState(null);

  // Edit functionality
  const handleEditClick = (index, seatCapacity) => {
    setEditIndex(index);
    setNewSeats(seatCapacity);
  };

  const handleSaveClick = async (trainId) => {
    try {
      await axios.patch(`http://localhost:7000/api/trains/update-seats/${trainId}`, {
        seat_capacity: newSeats,
      });
      alert("Seat capacity updated successfully.");
      setEditIndex(null); // Exit edit mode
    } catch (error) {
      setError("Failed to update seat capacity.");
      console.error("Error updating seat capacity:", error);
    }
  };

  // Delete functionality
  const handleDeleteClick = async (trainId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this train?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:7000/api/trains/delete/${trainId}`);
        alert("Train deleted successfully.");
      } catch (error) {
        setError("Failed to delete train.");
        console.error("Error deleting train:", error);
      }
    }
  };

  if (error) return <div className="text-center text-red-600 mt-5">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 mt-12">
      {trainList.map((train, index) => (
        <Card key={train._id} className="shadow-lg rounded-lg border border-gray-200 mb-7">
          <CardHeader
            color="blue-gray"
            className="flex justify-between items-center p-4"
            style={{ backgroundColor: "#213D77" }}
          >
            <Typography variant="h6" color="white">
              {train.train_name}
            </Typography>
            <Typography variant="small" color="white">
              Runs On: {train.running_days || "M T W T F S S"}
            </Typography>
          </CardHeader>

          <CardBody>
            <div className="flex justify-between items-center mb-2">
              <Typography variant="small" color="gray">
                Source:
              </Typography>
              <Typography variant="body1" color="blue-gray">
                {train.source} | {train.source_arrival || "N/A"}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="small" color="gray">
                Destination:
              </Typography>
              <Typography variant="body1" color="blue-gray">
                {train.destination} | {train.destination_arrival || "N/A"}
              </Typography>
            </div>
          </CardBody>

          <CardFooter className="text-center">
            <Typography variant="small" color="#213D77" className="font-semibold">
              Available Seats:
            </Typography>
            {editIndex === index ? (
              <Input
                type="number"
                value={newSeats}
                onChange={(e) => setNewSeats(Number(e.target.value))}
                className="ml-2 border border-gray-300 rounded px-2 py-1 mt-2"
              />
            ) : (
              <Typography variant="body1" color="blue-gray" className="ml-2">
                {train.seat_capacity}
              </Typography>
            )}

            <div className="flex justify-center gap-4 mt-4">
              {editIndex === index ? (
                <Button
                  onClick={() => handleSaveClick(train._id)}
                  style={{ backgroundColor: "#213D77" }}
                  size="sm"
                >
                  Save
                </Button>
              ) : (
                <IconButton
                  onClick={() => handleEditClick(index, train.seat_capacity)}
                  style={{ borderColor: "#213D77" }}
                  variant="outlined"
                  size="sm"
                >
                  <PencilIcon className="h-5 w-5 text-[#213D77]" />
                </IconButton>
              )}

              <IconButton
                onClick={() => handleDeleteClick(train._id)}
                style={{ borderColor: "#213D77" }}
                variant="outlined"
                size="sm"
              >
                <TrashIcon className="h-5 w-5 text-[#213D77]" />
              </IconButton>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GetAllTrains;
