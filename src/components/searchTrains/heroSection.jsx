/** @format */

import React, { useState } from "react";
import { Input, IconButton, Card, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowsUpDownIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const HeroSection = () => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [availableTrains, setAvailableTrains] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSwap = () => {
    setFirstValue(secondValue);
    setSecondValue(firstValue);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/trains/availability", {
        params: {
          source: firstValue,
          destination: secondValue,
        },
      });
      setAvailableTrains(response.data);
      setError("");

      if (response.data.length === 0) {
        setError("No trains available for the specified route.");
      } else {
        navigate("/trains-list", {
          state: {
            trains: response.data,
            source: firstValue,
            destination: secondValue,
          },
        });
      }
    } catch (err) {
      setError(err.response?.data.message || "An error occurred while fetching trains");
      setAvailableTrains([]);
    }
  };

  return (
    <div className="relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg"
          alt="Indian Railways"
        />
      </div>
      {/* Hero page heading */}
      <div className="flex flex-col items-end relative p-8 z-10">
        <h1 className="text-5xl font-semibold text-primary_blue mb-4">INDIAN RAILWAYS</h1>
        <h4 className="mr-24 text-xl text-primary_blue">Safety &nbsp;|&nbsp; Security &nbsp;|&nbsp; Punctuality</h4>
      </div>

      {/* Train search */}
      <div className="h-[70vh] w-[40vw] relative bg-white ml-28 -m-16 rounded-lg shadow-lg z-20">
        <div className="flex font-semibold gap-2 text-white text-center">
          <div className="bg-[#213D77] p-1 w-[20vw] rounded-lg">
            PNR STATUS
          </div>
          <div className="bg-[#213D77] p-1 w-[20vw] rounded-lg">
            CHARTS / VACANCY
          </div>
        </div>

        <div className="text-center text-3xl font-semibold text-[#213D77] mt-10">
          BOOK TICKET
        </div>

        {/* From Input */}
        <div className="flex flex-col items-center gap-8 mt-10">
          <Card className="w-[30vw]">
            <Input
              variant="outlined"
              label="From"
              icon={<PaperAirplaneIcon className="h-5 w-5 text-[#213D77]" />}
              value={firstValue}
              onChange={(e) => setFirstValue(e.target.value)}
              style={{ borderColor: '#213D77' }}
              color="lightblue" // Use a light color variant for input
            />
          </Card>

          {/* Swap Icon */}
          <IconButton
            size="sm"
            className="bg-[#F0F8FF] text-[#213D77] shadow-md -mt-2 -mb-2 rounded-full hover:bg-[#d0e1ff]"
            onClick={handleSwap}
          >
            <ArrowsUpDownIcon className="h-5 w-5" />
          </IconButton>

          {/* To Input */}
          <Card className="w-[30vw]">
            <Input
              variant="outlined"
              label="To"
              icon={<MapPinIcon className="h-5 w-5 text-[#213D77]" />}
              value={secondValue}
              onChange={(e) => setSecondValue(e.target.value)}
              style={{ borderColor: '#213D77' }}
              color="lightblue" // Use a light color variant for input
            />
          </Card>

          {/* Search Button */}
          <Button
            style={{ backgroundColor: "#FB792B" }}
            size="lg"
            className="mt-4 flex items-center gap-2 w-64 hover:bg-[#d6813e] transition duration-200"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Search
          </Button>
        </div>

        {/* Display Error Message */}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default HeroSection;
