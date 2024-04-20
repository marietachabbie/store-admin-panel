import React, { useState, useEffect } from "react";
import StoresTable from "../Components/StoresTable/StoresTable";
import Modal from "../Components/Modal/Modal";
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
      <div className="App">
        <div className="stores-header">
          <h1>Stores</h1>
          <Modal/>
        </div>
        <StoresTable data={data} />
      </div>
    );
}
