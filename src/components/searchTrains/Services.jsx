/** @format */

import React from "react";
import HolidaysCards from "./HolidaysCards";
import Footer from "./Footer";
const data = [
  {
    image: "https://www.irctc.co.in/nget/assets/images/exterior.jpg",
    name: "Mountain Landscape",
    description:
      "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an “Experience Unsurpassed”. It has been a winner of “World’s Leading Luxury train” by World Travel Awards consecutively for last six years.",
  },
  {
    image: "https://www.irctc.co.in/nget/assets/images/Thailand.jpg",
    name: "Forest Pathway",
    description:
      "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa charges and overseas medical insurance to give you a hassle-free and memorable experience.",
  },
  {
    image: "https://www.irctc.co.in/nget/assets/images/Bharat_Gaurav.jpg",
    name: "City Skyline",
    description:
      "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes or Picturesque Islands, IRCTC has it all. Discover India through IRCTC!",
  },
  {
    image: "https://www.irctc.co.in/nget/assets/images/Manali.jpg",
    name: "Desert Dunes",
    description:
      "IRCTC operates Bharat Gaurav Tourist Train having AC III-Tier accommodation on train specially designed to promote domestic tourism in India. This train runs on various theme based circuits covering pilgrimage and heritage destinations in its itinerary on a 5 days to 20 days trip and showcase India’s rich cultural heritage.",
  },
  {
    image: "https://www.irctc.co.in/nget/assets/images/Kashmir.jpg",
    name: "Beach Sunset",
    description:
      "IRCTC offers Exclusive Rail tour packages with confirmed train tickets, sight-seeing and meals for enchanting Nilgiri Mountains, Darjeeling, Kullu Manali, Kashmir, Gangtok or divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi, Tirupati etc. Holiday packages/ Land packages to these destinations are also available.",
  },
];

const Services = () => {
  return (
    <div className="flex justify-center items-center mt-[14vh] flex-col">
      <div className="w-[50vw] text-4xl p-8 font-bold">
        Have you not found the right one? Find a service suitable for you here.
      </div>
      <div>
        <img
          className="w-full"
          src="https://contents.irctc.co.in/en/GPT_NWEB_HOME_CENTER.jpeg"
          alt="Service banner"
        />
      </div>

      <div className="text-2xl mt-4 ">HOLIDAYS</div>
      <div className=" flex flex-wrap p-8 gap-4 justify-center">
        {data.map((holiday, index) => (
          <HolidaysCards key={index} data={holiday} />
        ))}
      </div>

      <div>
        <Footer />
      </div>
      <div>
        <img
          src="https://www.irctc.co.in/nget/assets/images/security.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Services;
