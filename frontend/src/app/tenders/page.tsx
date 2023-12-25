"use client"
import useUserAddress from '@/hooks/useUserAddress';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import contractAddress from "../../contracts/contract-address.json"
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import TenderDetail from '../components/TenderDetail';
import EligibleBidderList from '../components/EligibleBidderList';

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


const Tenders = () => {
  const {state,userAddress} = useUserAddress();
  const { contract } = state;
  const DeployerAddress = contractAddress.DeployerAddress.toLowerCase();
  const router = useRouter()
  const [allTenders, setAllTenders] = useState<any[]>([]);
  const [selectedTender, setSelectedTender] = useState<any | null>(null);
  const [selectedTenderId, setSelectedTenderId] = useState<any | null>(null);
  const [showEligibleBidderList, setShowEligibleBidderList] = useState(false)

  console.log("allTenders:",allTenders);
  

  if(userAddress === "Other Network") router.push("/")

  useEffect(() => {
    const getAllTenders = async () => {
      if (contract){
        const [tenderIds, tenders] = await contract.viewAllTenders();
        setAllTenders(tenders);
      }    
    };
    contract && getAllTenders();
    
  }, [contract])


   // Function to format timestamp to a readable date
   const formatDeadline = (timestamp:any) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  const handleViewDetail = (tender: any) => {
    setSelectedTender(tender);
  };

 const handleShowEligibleBidders = (tenderId:any)=>{
  console.log("handleShowEligibleBidders")
  setShowEligibleBidderList(true);
  setSelectedTenderId(tenderId);
  return <EligibleBidderList tenderId={tenderId} onClose={() => setShowEligibleBidderList(false)} />

 }


    
  return (
    <>
    {userAddress ? (
        <div className="p-8 bg-gray-200 min-h-screen">

        {/* User Account Details Section */}
    <div className="mb-6 text-center">
    <div className="bg-white p-6 rounded-md shadow-md">
    <h2 className="text-xl font-bold mb-2">Your Account</h2>
    <p className="text-gray-600 truncate">
        <span className="md:block">{userAddress}</span>
    </p>
    </div>
    </div>
    {userAddress === DeployerAddress && 
    <div className="flex justify-end mb-4">
    <Link href="/addtender">
      <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300">
        Add Tender
      </button>
    </Link>
  </div>
   }
    
    <h1 className="text-3xl font-bold mb-6">List of Tenders</h1>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allTenders && allTenders.length > 0 ?
      (
        <>
         {/* Map through your tender data and create cards */}
      {allTenders.map((tender,index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">{tender.title}</h2>
          <p className="text-gray-600 mb-2">Deadline: {formatDeadline(tender.deadline)}</p>
          <button
          onClick={() => handleViewDetail(tender)} 
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
            View Detail
          </button>
          {getStatusString(tender.status.toString()) === "Closed" &&
          <button
          onClick={()=>handleShowEligibleBidders(tender.id)} 
          className=" bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition duration-300 ml-2">
            View Result
          </button>
          }
        </div>

      ))}
      </>
      ):
    (
      <div>No Tenders...</div>
      )
    }
     
    </div>
    {selectedTender && <TenderDetail tender={selectedTender} onClose={() => setSelectedTender(null)} />}
    {showEligibleBidderList && <EligibleBidderList tenderId={selectedTenderId} onClose={() => setShowEligibleBidderList(false)} />}



    </div>
    ) : (
      <div className='bg-gray-200 min-h-screen p-4'>
        Loading....
      </div>
    )}
  </>
    
 
    
   
  );
}

export default Tenders

