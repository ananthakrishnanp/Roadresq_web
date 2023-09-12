import React,{ useEffect } from "react";
import { FIREBASE_API } from "./constants";


const roadresqdata = async () => {
    try {
      const response = await fetch(FIREBASE_API);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    roadresqdata();
  }, []);

  export default useRoadresqapi;