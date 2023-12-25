import React, { useEffect, useState } from 'react'
import useUserAddress from '@/hooks/useUserAddress';

interface Bidder {
    bidder: string;
    bidAmount: bigint;
    estimatedCompletionTime: bigint;
  }
  

const BidderList = ({ tenderId, onClose }:any) => {
    const [bidders, setBidders] = useState<Bidder[]>([]);
    const {state,userAddress} = useUserAddress();
    const { contract } = state;
    // console.log("tenderId:",tenderId)

    useEffect(() => {
        const viewAllBidders = async (tenderId:any) => {
            try {
              if (contract) {
                    const result: Bidder[] = await contract.viewAllBidders(tenderId);
                    setBidders(result)
                    console.log("result:",result);  // Handle the result as needed
              }
          } catch (error) {
              console.error("Error calling viewAllBidders:", error);
          }    
          };
        contract && viewAllBidders(tenderId);
        
      }, [contract])


     

   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-md shadow-md ">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">List of Bidders:</h2>

        {bidders && bidders.length > 0 ?
        
        <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr className='text-center '>
            <th className="py-2 border border-gray-300">S.No</th>
            <th className="py-2 border border-gray-300">Address</th>
            <th className="py-2 border border-gray-300">Bid Amount</th>
            <th className="py-2 border border-gray-300">Estimated Completion Time</th>
          </tr>
        </thead>
        <tbody>
          {bidders.map((bidder, index) => (
            <tr key={index} className='text-center'>
              <td className="py-2 border border-gray-300">{index + 1}</td>
              <td className="py-2 border border-gray-300">{bidder.bidder}</td>
              <td className="py-2 border border-gray-300">Rs. {bidder.bidAmount.toString()}</td>
              <td className="py-2 border border-gray-300">{bidder.estimatedCompletionTime.toString()} months</td>
            </tr>
          ))}
        </tbody>
      </table>
    :(
      <div>No Bidders...</div>
    )}

       


        </div>
    </div>
  )
}

export default BidderList