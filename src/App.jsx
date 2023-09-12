import React, { useEffect, useState } from 'react';
import Cards from './components/Cards';
import Navbar from './components/Navbar';

const App = () => {
  const [complaintsData, setComplaintsData] = useState({});
  const [error, setError] = useState(null);

  const roadresqdata = async () => {
    try {
      const response = await fetch('https://roadresq-3e320-default-rtdb.asia-southeast1.firebasedatabase.app/complaints.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
      setComplaintsData(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    roadresqdata();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {console.log("hey", complaintsData)}
      
      <div className='bg-black'>
      <Navbar/>
        {Object.keys(complaintsData).map((complaintKey) => {
          const complaint = complaintsData[complaintKey];
          return (
            <div key={complaintKey} className="card ">
              {console.log("this", complaint?.body)}
              <Cards className="grid grid-cols-3 gap-4 " body={complaint?.body} category={complaint?.category} date={complaint?.date} name={complaint?.name} phoneno={complaint?.phoneNumber} status={complaint?.status} time={complaint?.time}/>

              
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
