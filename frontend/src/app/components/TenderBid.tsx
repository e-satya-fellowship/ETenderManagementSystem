import useUserAddress from '@/hooks/useUserAddress';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const TenderBid = ({ tenderId, onClose }:any) => {
    // console.log("tenderId:",tenderId);
    const [budget, setBudget] = useState(0);
    const [estimatedCompletionTime, setEstimatedCompletionTime] = useState(0);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
    const {state,userAddress} = useUserAddress();
    const { contract } = state;
    const [formData, setFormData] = useState({
      budget: 0,
      estimatedCompletionTime: 0,
    });

    // Function to handle form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
    

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };


  const handleSubmit =async (e:any) => {
    e.preventDefault();
    try {
        setIsSpinnerLoading(true);
        const budgetAsString = String(formData.budget);
        if (!/^[1-9]\d*$/.test(budgetAsString)) {
          toast.error('Please enter a valid positive integer for the budget.');
          return;
        }
        // console.log("newBudget:",budgetAsString)
        // console.log("estimatedCompletionTime:",estimatedCompletionTime)
    
        const bid = await contract?.placeBid(tenderId,estimatedCompletionTime,formData.budget);
        await bid.wait();
        toast.success('Bid placed successfully!');
        // router.push("/tenders")
        
      } catch (error) {
        console.log("error:",error)
        toast.error('Something went wrong');
      }finally{
        setIsSpinnerLoading(false);
      }
    // Reset form fields
    setBudget(0);
    setEstimatedCompletionTime(0);

    // Close the form
    onClose();
  };
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-white p-6 rounded-md shadow-md max-w-md">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <h2 className="text-xl font-bold mb-4">Submit Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Estimated Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="estimatedCompletionTime" className="block text-sm font-medium text-gray-700">
          Estimated Project Completion Time in Months
          </label>
          <input
            type="number"
            id="estimatedCompletionTime"
            name="estimatedCompletionTime"
            value={formData.estimatedCompletionTime}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
         {isSpinnerLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default TenderBid