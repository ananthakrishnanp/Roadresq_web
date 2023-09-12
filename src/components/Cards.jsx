import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Cards = ({ body, category, date, name, phoneno, status, time }) => {
  const [button, setButton] = useState("Resolve");

  const handleReview = () => {
    setButton("Resolved");
    toast.success('Issue Resolved.');
  };

  return (
    <div className=' '>
      <div className="text-white space-x-4 p-4">
        <div className="border rounded-lg  p-4">
          <div className='flex'>
            <div className="text-lg font-semibold mb-2">{name}</div>
            {(status === 'Under Review' && button === 'Resolve') ? (
              <button onClick={handleReview} className='bg-red-600  hover:bg-red-500 ml-20 px-3 rounded-lg'>{button} </button>
            ) : (
              <div></div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          <div className="text-sm  mb-2">Date: {date}</div>
          <div className="text-sm  mb-2">Time: {time}</div>
          <div className="text-sm  mb-2">Category: {category}</div>
          <div className="text-sm mb-2">Complaint: {body}</div>
          <div className="text-sm  mb-2">Status: {status}</div>
          <div className="text-sm ">Phone Number: {phoneno}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
