/** @format */

import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";

const HolidaysCards = ({ data }) => {
  return (
    <div className="flex justify-center">
      <Card className="mt-6 w-80 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#213D77] rounded-lg">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-t-lg overflow-hidden">
          <img
            src={data.image}
            alt="Holiday Destination"
            className="w-full h-48 object-cover" // Ensure image covers the header area
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="#213D77" className="mb-2 font-semibold">
            {data.name}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {data.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a className="inline-block">
            <Button
              size="sm"
              variant="gradient"
              className="flex items-center gap-2 bg-[#FB792B] text-white hover:bg-[#d6813e] transition duration-200"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HolidaysCards;
