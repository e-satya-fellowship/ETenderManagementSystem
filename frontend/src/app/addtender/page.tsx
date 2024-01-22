"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import useUserAddress from '@/hooks/useUserAddress';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';
import contractAddress from "../../contracts/contract-address.json"


const AddTender: React.FC = () => {
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

  // State to manage form values
  const [formData, setFormData] = useState({
    title: '',
    budget: 0,
    estimatedCompletionTime: 0,
    deadline: Date.now().toString() ,
    description: '',
  });
  const {state,userAddress} = useUserAddress();
  const { contract } = state;
  const DeployerAddress = contractAddress.DeployerAddress.toLowerCase();

  const router = useRouter();

  if(userAddress === "Other Network" ) router.push("/")

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSpinnerLoading(true);
       // Validate budget field for positive integers
        const budgetAsString = String(formData.budget);
        if (!/^[1-9]\d*$/.test(budgetAsString)) {
          toast.error('Please enter a valid positive integer for the budget.');
          return;
        }
      // Convert the date string to a Unix timestamp or use a suitable format
      const deadlineTimestamp = Date.parse(formData?.deadline);
      const upload = await contract?.issueTender(formData.title,formData.description, deadlineTimestamp,formData.budget, formData.estimatedCompletionTime);
      await upload.wait();
      toast.success('Contract Issued!');
      router.push("/tenders")
      
    } catch (error) {
      console.log("error:",error)
      toast.error('Something went wrong');
    }finally{
      setIsSpinnerLoading(false);
    }
  
   
  };

  // Function to handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
    {userAddress && userAddress === DeployerAddress ?
      (
    
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
      <div className="flex justify-end mb-4">
        <Link href="/tenders">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
            Back to Tenders
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Add Tender</h1>

      {/* Tender Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Tender Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Minimum Budget Field */}
        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-600">
            Minimum Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Estimated Time Required */}
        <div className="mb-4">
          <label htmlFor="estimatedCompletionTime" className="block text-sm font-medium text-gray-600">
            Estimated Project Completion Time in Months
          </label>
          <input
            type="number"
            id="estimatedCompletionTime"
            name="estimatedCompletionTime"
            value={formData.estimatedCompletionTime}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Deadline Field */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
            Tender Deadline
          </label>
          <input
            type="date"
            // type='number'
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300">
          
          {isSpinnerLoading ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
      )
    :(
      <div className='bg-gray-200 min-h-screen p-4'>
      Forbidden....
    </div>
    )}
    </>
  );
};

export default AddTender;
