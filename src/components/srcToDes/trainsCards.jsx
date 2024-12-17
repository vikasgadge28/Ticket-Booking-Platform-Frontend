/** @format */

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import AuthModals from "../../views/loginSignUpModals";

const TrainsCards = ({ trains, source, destination, date }) => {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [seatCount, setSeatCount] = useState(1);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isUserLoggedIn = () => {
    const userData = localStorage.getItem("user");

    return !!userData;
  };

  const handleBookClick = (train) => {
    if (train.available_seats > 0) {
      if (isUserLoggedIn()) {
        setSelectedTrain(train);
        setBookingDialogOpen(true);
      } else {
        setAuthOpen(true);
      }
    }
  };
  useEffect(() => {
    if (selectedTrain) {
    }
  }, [selectedTrain]);

  const handleSeatChange = (e) => {
    const newCount = parseInt(e.target.value);

    if (newCount >= 1 && newCount <= selectedTrain.available_seats) {
      setSeatCount(newCount);
      console.log(seatCount);
    }
  };

  const confirmBooking = async () => {
    try {
      console.log(selectedTrain.train_id);
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData) {
        setAuthOpen(true);
        setBookingDialogOpen(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:7000/api/bookings/${selectedTrain.train_id}/book`,
        {
          user_id: userData._id, // Make sure to use the correct user ID field
          no_of_seats: seatCount,
        }
      );

      if (response.status === 200) {
        const { booking_id, seat_numbers } = response.data;
        // Show success message with booking details
        alert(
          `Booking Successful!\n` +
            `Booking ID: ${booking_id}\n` +
            `Seat Numbers: ${seat_numbers.join(", ")}\n` +
            `Train: ${selectedTrain.train_name}\n` +
            `From: ${source} To: ${destination}\n` +
            `Date: ${date}`
        );

        // Update the available seats in the UI
        const updatedTrains = trains.map((train) => {
          if (train._id === selectedTrain.train_id) {
            return {
              ...train,
              available_seats: train.available_seats - seatCount,
            };
          }
          return train;
        });

        // If you have a function to update trains state, call it here
        // updateTrains(updatedTrains);
      }
      setBookingDialogOpen(false);
    } catch (error) {
      console.error("Booking Error:", error);
      // Handle different error scenarios
      if (error.response) {
        switch (error.response.status) {
          case 404:
            alert("Train not found. Please try again later.");
            break;
          case 400:
            alert("Not enough available seats. Please select fewer seats.");
            break;
          case 500:
            alert("Server error. Please try again later.");
            break;
          default:
            alert(
              error.response.data.message ||
                "Failed to book seats. Please try again."
            );
        }
      } else {
        alert("Network error. Please check your internet connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ul className="list-disc pl-5 mt-4">
        {trains.map((train, index) => (
          <div key={index} className="my-2 border border-gray-300 rounded p-4">
            <div className="flex justify-between bg-[#F5F5F5] p-2">
              <div className="font-bold text-xl">{train.train_name}</div>
              <div>Runs On : M T W T F S S</div>
              <div className="font-bold text-[#438bea]">Train Schedule</div>
            </div>

            <div className="flex justify-between p-2">
              <div className="flex gap-4">
                <div>{source} |</div>
                <div>{date}</div>
              </div>
              <div className="flex gap-4">
                <div>{destination} |</div>
                <div>{date}</div>
              </div>
            </div>

            <div className="mt-4 bg-blue-200 w-[11vw] p-2 text-center border border-black rounded-lg">
              Available Seats: {train.available_seats}
            </div>

            <div className="mt-4">
              Please check{" "}
              <span className="text-primary_blue font-bold">NTES website</span>{" "}
              or <span className="text-primary_blue font-bold">NSE app</span>{" "}
              for actual time before boarding
            </div>

            <div className="mt-4">
              <Button
                onClick={() => handleBookClick(train)}
                color="blue"
                variant="gradient"
                disabled={train.available_seats === 0}>
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </ul>

      {/* Booking Dialog */}
      <Dialog
        open={bookingDialogOpen}
        handler={() => !isLoading && setBookingDialogOpen(false)}>
        <DialogHeader>
          Book a Ticket From {source} to {destination}
        </DialogHeader>
        <DialogBody className="flex gap-4">
          <div className="w-full">
            <p className="mb-4">Select Seat Count:</p>
            <Input
              type="number"
              value={seatCount}
              onChange={handleSeatChange}
              min={1}
              max={selectedTrain ? selectedTrain.available_seats : 1}
              disabled={isLoading}
              className="w-full"
            />
            {selectedTrain && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Train: {selectedTrain.train_name}</p>
                <p>Available Seats: {selectedTrain.available_seats}</p>
                <p>Date: {date}</p>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setBookingDialogOpen(false)}
            className="mr-1"
            disabled={isLoading}>
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={confirmBooking}
            disabled={isLoading}>
            <span>{isLoading ? "Booking..." : "Confirm Booking"}</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Auth Modal */}
      <AuthModals
        open={authOpen}
        setOpen={setAuthOpen}
        onLoginSuccess={() => {
          setAuthOpen(false);
          if (selectedTrain) {
            setBookingDialogOpen(true);
          }
        }}
      />
    </>
  );
};

export default TrainsCards;
