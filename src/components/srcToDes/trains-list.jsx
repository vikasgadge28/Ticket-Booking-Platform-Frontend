/** @format */
import {
  ArrowsRightLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  IconButton,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useLocation } from "react-router-dom";
import TrainsCards from "./trainsCards";

const TrainList = () => {
  const location = useLocation();
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${daysOfWeek[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  // Destructure trains, source, and destination from location state
  const { trains, source, destination } = location.state || {
    trains: [],
    source: "",
    destination: "",
  };
  console.log(source, destination);

  // Check if there are no trains available
  if (!trains || trains.length === 0) {
    return (
      <div className="text-red-500 text-center mt-4">
        <Typography variant="h6">
          No trains available for the specified route.
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* Header Section */}
      <div className="bg-[#213D77] flex flex-col items-center p-6">
        <Typography variant="h4" className="text-white mb-4">
          Available Trains:
        </Typography>
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-md text-center bg-white p-3 shadow-md w-28">
            <Typography className="text-black font-semibold">
              {source}
            </Typography>
          </div>
          <IconButton
            size="sm"
            className="bg-blue-100 text-black shadow-md rounded-full">
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </IconButton>
          <div className="rounded-md text-center bg-white p-3 shadow-md w-28">
            <Typography className="text-black font-semibold">
              {destination}
            </Typography>
          </div>
        </div>
      </div>

      {/* Train Information Section */}
      <div className="border-b border-gray-300 flex justify-center items-center text-lg p-4 mt-4">
        <div className="text-gray-700">
          {trains.length} Results for {source}
        </div>
        <ArrowRightIcon className="h-5 w-5 text-black mx-2" strokeWidth={3} />
        <div className="text-gray-700">
          BHOPAL JN | {formattedDate} | For Quota | General
        </div>
      </div>

      {/* Trains List Section */}
      <div className="mt-6">
        <TrainsCards
          trains={trains}
          source={source}
          destination={destination}
          date={formattedDate}
        />
      </div>
    </div>
  );
};

export default TrainList;
