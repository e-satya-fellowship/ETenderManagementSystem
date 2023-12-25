import React, { useState } from 'react';
import TenderBid from './TenderBid';
import useUserAddress from '@/hooks/useUserAddress';
import contractAddress from "../../contracts/contract-address.json"
import BidderList from './BidderList';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

function getStatusString(status:string) {
  switch (status) {
      case "0":
          return "Open";
      case "1":
          return "Closed";
      default:
          return "Unknown";
  }
}


const TenderDetail = ({ tender, onClose }:any) => {
  const {state,userAddress} = useUserAddress();
  const DeployerAddress = contractAddress.DeployerAddress.toLowerCase();
  const { contract } = state;
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);



 

    const [selectedTenderId, setSelectedTenderId] = useState<any | null>(null);
    const [showBidderList, setShowBidderList] = useState(false)
    // console.log("bidders:",bidders);  // Handle the result as needed


    const closeTender = async (tenderId:any) => {
      try {
        setIsSpinnerLoading(true);
        if (contract) {
              await contract.closeTender(tenderId);
              toast.success("Tender Closed !!")
        }
    } catch (error) {
        console.error("Error calling closeTender:", error);
    }finally{
      setIsSpinnerLoading(false);
    } 
    };


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
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Status:</span> 
          {/* <p>{tender.status.toString()}</p> */}
          <p>{getStatusString(tender.status.toString())}</p>
        </p>
        {userAddress != DeployerAddress && getStatusString(tender.status.toString()) === "Open" && 
        <button
        onClick={() => handleBid(tender.id)} 
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
            Bid
        </button> 
        }
        {userAddress === DeployerAddress && 
        <>
            <button
            onClick={()=>setShowBidderList(true)}
             className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
              View Applied Bidders
            </button>
            {getStatusString(tender.status.toString()) === "Open" && 
            <button
            onClick={()=>closeTender(tender.id)}
             className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ml-2">
              {isSpinnerLoading ? <Spinner /> : " Close Tender"}
            </button> 
              }
            </>
        }
      </div>
    </div>

    {selectedTenderId && <TenderBid tenderId={selectedTenderId} onClose={() => setSelectedTenderId(null)} />}
    {showBidderList && <BidderList tenderId={tender.id} onClose={() => setShowBidderList(false)} />}

    </>
  );
};

export default TenderDetail;
