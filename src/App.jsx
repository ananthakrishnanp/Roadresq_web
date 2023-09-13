import React, { useEffect, useState } from 'react';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import buttonImage1 from './assets/button-image-1.svg';
import buttonImage2 from './assets/button-image-2.svg';
import buttonImage3 from './assets/button-image-3.svg';
import buttonImage4 from './assets/button-image-4.svg';
import bg from './assets/wave-1.svg'
import homeImage from './assets/home.svg';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const [complaintsData, setComplaintsData] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('');


 

 

  

  // Function to fetch complaints with a specific category
  const fetchComplaintsByCategory = async (category) => {
    try {
      const apiUrl = category
        ? `https://roadresq-3e320-default-rtdb.asia-southeast1.firebasedatabase.app/complaints.json?orderBy="category"&equalTo="${category}"`
        : 'https://roadresq-3e320-default-rtdb.asia-southeast1.firebasedatabase.app/complaints.json';

        setCurrentCategory(category);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Convert the data object into an array
      const dataArray = Object.keys(data).map((complaintKey) => ({
        id: complaintKey,
        ...data[complaintKey],
      }));
  
      // Sort the data by date and time in descending order
      dataArray.sort((a, b) => {
        const dateComparison = new Date(b.date) - new Date(a.date);
        if (dateComparison === 0) {
          // If dates are equal, sort by time
          return b.time.localeCompare(a.time);
        }
        return dateComparison;
      });
  
      setComplaintsData(dataArray);
    } catch (error) {
      setError(error);
    }
  };
  

  useEffect(() => {
    // Initially, fetch all complaints
    fetchComplaintsByCategory('');
  }, []);

  const onUpdateStatus = (complaintId, newStatus) => {
    // Create a copy of the complaints data array
    const updatedComplaintsData = [...complaintsData];

    // Find the index of the specific complaint
    const index = updatedComplaintsData.findIndex((complaint) => complaint.id === complaintId);

    // Update the status of the specific complaint
    if (index !== -1) {
      updatedComplaintsData[index].status = newStatus;

      // Update the state with the new complaints data
      setComplaintsData(updatedComplaintsData);
    }
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

 

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <Toaster position="top-right" />
      <div className='bg-black'>
      {/* Background Image */}
    <img
      src={bg}
      alt="Background Image"
      className="fixed bottom-0 left-0 w-full z-0 blur-sm"
      
    />

        <Navbar />
        

        {/* Image buttons container */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="border rounded-lg p-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => fetchComplaintsByCategory('')}
            >
              <img src={homeImage} alt="Home" />
            </button>
            <button
              className="border rounded-lg p-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => fetchComplaintsByCategory('accident')}
            >
              <img src={buttonImage1} alt="Button 1" />
            </button>
            <button
              className="border rounded-lg p-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => fetchComplaintsByCategory('rules')}
            >
              <img src={buttonImage2} alt="Button 2" />
            </button>
            <button
              className="border rounded-lg p-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => fetchComplaintsByCategory('road')}
            >
              <img src={buttonImage3} alt="Button 3" />
            </button>
            <button
              className="border rounded-lg p-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => fetchComplaintsByCategory('other')}
            >
              <img src={buttonImage4} alt="Button 4" />
            </button>
          </div>
          
        </div>

        {currentCategory && (
        <h2 className="text-2xl font-bold my-2 ml-8  text-white">
        {currentCategory ? `${capitalizeFirstLetter(currentCategory)}` : 'All Categories'}
      </h2>
        )}

        {complaintsData.map((complaint) => (
          <div key={complaint.id} className="card relative z-10">
            <Cards
              id={complaint.id}
              body={complaint?.body}
              category={complaint?.category}
              date={complaint?.date}
              name={complaint?.name}
              phoneno={complaint?.phoneNumber}
              status={complaint?.status}
              time={complaint?.time}
              subject={complaint?.subject}
              onUpdateStatus={onUpdateStatus}
              />
            </div>
          ))}
        </div>

      </>
    );
  };

  export default App;
