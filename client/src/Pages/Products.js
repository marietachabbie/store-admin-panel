import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductsTable from "../Components/ProductsTable/ProductsTable";

export default function Products() {
    const [data, setData] = useState([]);

    const location = useLocation();
    const { category_id } = location.state.Data;
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const response = await fetch("/api/categories/" + category_id);
          const stores = await response.json();
          setData(stores);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    return (
        <ProductsTable data={data} />
    )
}
