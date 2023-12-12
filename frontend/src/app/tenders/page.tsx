import Link from 'next/link';
import React from 'react'

const tenderData = [
    { id: 1, title: 'Software Development', deadline: '2023-12-15' },
    { id: 2, title: 'Construction Project', deadline: '2023-12-31' },
    { id: 3, title: 'Graphic Design Services', deadline: '2023-12-20' },
    // Add more dummy data as needed
  ];

const Tenders = () => {

    
  return (
    <div className="p-8 bg-gray-200 min-h-screen">

        {/* User Account Details Section */}
    <div className="mb-6 text-center">
    <div className="bg-white p-6 rounded-md shadow-md">
    <h2 className="text-xl font-bold mb-2">Your Account</h2>
    <p className="text-gray-600 truncate">
        <span className="md:block">0x1234567890123456789012345678901234567890123456789012345678901234</span>
    </p>
    </div>
    </div>
    <div className="flex justify-end mb-4">
      <Link href="/addtender">
        <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300">
          Add Tender
        </button>
      </Link>
    </div>
    <h1 className="text-3xl font-bold mb-6">List of Tenders</h1>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Map through your tender data and create cards */}
      {tenderData.map((tender) => (
        <div key={tender.id} className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">{tender.title}</h2>
          <p className="text-gray-600 mb-2">Deadline: {tender.deadline}</p>
          <Link href={`/tenderdetail?id=552252535`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
            View Detail
          </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Tenders