import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary_blue text-white py-8 w-screen">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
        <div>
          <h3 className="font-semibold">IRCTC Trains</h3>
          <ul>
            <li><a href="#" className="hover:underline">Train Tickets</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold">Important Information</h3>
          <ul>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Important Information</h3>
          <ul>
            <li><a href="#" className="hover:underline">Guidelines</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Agents</h3>
          <ul>
            <li><a href="#" className="hover:underline">Agent Login</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Enquiries</h3>
          <ul>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Help & Support</h3>
          <ul>
            <li><a href="#" className="hover:underline">Support Center</a></li>
            {/* Add other links as needed */}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm mt-6">
        <div>
          <h3 className="font-semibold">Important Information</h3>
          
        </div>
        
        <div>
          <h3 className="font-semibold">General Information</h3>
        </div>

        <div>
          <h3 className="font-semibold">Important Information</h3>
        </div>

        <div>
          <h3 className="font-semibold">Agents</h3>
        </div>

        <div>
          <h3 className="font-semibold">Enquiries</h3>
        </div>

        <div>
          <h3 className="font-semibold">Enquiries</h3>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm mt-6">
        <div>
          <h3 className="font-semibold">IRCTC Trains</h3>
        </div>
        
        <div>
          <h3 className="font-semibold">General Information</h3>
        </div>

        <div>
          <h3 className="font-semibold">Enquiries</h3>
        </div>

        <div>
          <h3 className="font-semibold">Agents</h3>
        </div>

        <div>
          <h3 className="font-semibold">Enquiries</h3>
        </div>

        <div>
          <h3 className="font-semibold">Help & Support</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
