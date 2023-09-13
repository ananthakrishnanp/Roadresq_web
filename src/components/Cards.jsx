import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';


// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Cards = ({ id, body, category, date, name, phoneno, status, time, onUpdateStatus, subject}) => {
  const [button, setButton] = useState('Resolve');
  

  const handleResolve = () => {
    if (status === 'Under Review' && button === 'Resolve') {
      const complaintRef = ref(database, `complaints/${id}`);
  
      // Define an object to hold the data to be updated
      const updatedData = {
        status: 'Resolved',
        
      };
  
      // Perform the update operation in the database
      update(complaintRef, updatedData)
        .then(() => {
          setButton('Resolved');
          toast.success('Complaint resolved successfully');
          // Update the local state with the new status
          onUpdateStatus(id, 'Resolved');
        })
        .catch((error) => {
          console.error('Error updating status:', error);
          toast.error('Error updating status');
          
        });
    }
  };
  

  return (
    <div className=' '>
  <div className="text-white space-x-4 p-4">
    <div className="border rounded-lg p-4 bg-opacity-26 backdrop-blur-sm border-opacity-30 border-white backdrop-filter shadow-md">
      <div className='flex'>
        <div className="text-lg font-semibold mb-2">{subject}</div>
        {(status === 'Under Review' && button === 'Resolve') ? (
          <button onClick={handleResolve} className='bg-red-600 hover:bg-red-500 ml-20 px-3 rounded-lg'>
            {button}
          </button>
        ) : (
          <div></div>
        )}
       
      </div>
      <div className="text-sm mb-2">Name: {name}</div>
      <div className="text-sm mb-2">Date: {date}</div>
      <div className="text-sm mb-2">Time: {time}</div>
      <div className="text-sm mb-2">Category: {category}</div>
      <div className="text-sm mb-2">Complaint: {body}</div>
      <div className="text-sm mb-2">Status: {status}</div>
      <div className="text-sm">Phone Number: {phoneno}</div>
    </div>
  </div>
</div>

  );
};

export default Cards;