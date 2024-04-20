import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Stores from "./Pages/Stores";
import Products from "./Pages/Products";

export default function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Stores />} />
          <Route path="/products/:category" element={<Products />} />
      </Routes>
    </Router>
  );
}
