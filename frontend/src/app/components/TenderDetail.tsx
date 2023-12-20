import React, { useState } from 'react';
import TenderBid from './TenderBid';

const TenderDetail = ({ tender, onClose }:any) => {

    const [selectedTenderId, setSelectedTenderId] = useState<any | null>(null);


    const handleBid = (tenderId: any) => {
        setSelectedTenderId(tenderId);
      };
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full h-full">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">{tender.title}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Deadline:</span> 
          <p>{new Date(Number(tender.deadline)).toLocaleString()}</p>
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Description:</span> 
          <p>{tender.description}</p>
        </p>
        <button
        onClick={() => handleBid(tender.id)} 
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
            Bid
        </button>
      </div>
    </div>

    {selectedTenderId && <TenderBid tenderId={selectedTenderId} onClose={() => setSelectedTenderId(null)} />}

    </>
  );
};

export default TenderDetail;
