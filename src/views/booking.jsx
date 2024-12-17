/** @format */

// src/components/UserBookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve user ID from local storage
  const user = JSON.parse(localStorage.getItem("user")); // Ensure 'userId' is the correct key used during login
  console.log(user._id);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user._id) {
        setError("User ID not found in local storage.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/user/${user._id}`
        );
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} rrrrr</div>;
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ?
        <p>No bookings found.</p>
      : <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <h3>Booking ID: {booking.booking_id}</h3>
              <p>Train ID: {booking.train_id._id}</p>
              <p>Number of Seats: {booking.no_of_seats}</p>
              <p>Seat Numbers: {booking.seat_numbers.join(", ")}</p>
              <p>Arrival Time at Source: {booking.arrival_time_at_source}</p>
              <p>
                Arrival Time at Destination:{" "}
                {booking.arrival_time_at_destination}
              </p>
              <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default UserBookings;
