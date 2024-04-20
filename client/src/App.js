import React, { useState, useEffect } from "react";
import Table from "./Components/Table/Table";
import "./App.css";
import Modal from "./Components/Modal/Modal";

function App() {
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
      <Table data={data} />
    </div>
  );
}

export default App;