import React, { useState, useEffect } from "react";
import StoresTable from "../Components/StoresTable/StoresTable";
import StoresModal from "../Components/StoresModal/StoresModal";
import "./Stores.css";

export default function Store() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stores");
        const stores = await response.json();
        setData(stores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <div className="Stores">
        <div className="stores-header">
          <h1>Stores</h1>
          <StoresModal/>
        </div>
        <StoresTable data={data} />
      </div>
    );
}
