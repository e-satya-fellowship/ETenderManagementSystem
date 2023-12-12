"use client"
import useUserAddress from '@/hooks/useUserAddress';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Home() {
  const {userAddress} = useUserAddress();

  const handleConnectWallet = ()=>{
    if(!userAddress){
      toast.error("Please Install Metamask Wallet");
    }else if(userAddress == "Other Network"){
      toast.error("Please Switch to Sepolia Testnet");
    }
  }
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-6 text-center">Tender Management System</h1>
   
    {!userAddress || userAddress === "Other Network" ? (
            <div>
              <button 
              onClick={handleConnectWallet}
              className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300">
                Connect Wallet
              </button>
            </div>
          ) : (
            <>
              <p 
              className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300">
                Your Account
              </p>
            <p
              className="mt-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-300">
              {userAddress}
            </p>
            <Link href="/tenders"
            className='mt-4 underline font-semibold'
            >View Tenders</Link>
            </>
          )}
  </div>
  )
}