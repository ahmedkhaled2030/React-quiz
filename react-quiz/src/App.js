import { useEffect, useState } from "react";
import Question from "./components/Question";
import axios from "axios";
import Center from "./components/Center";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Form from "./pages/Form";
function App() {
  return (
    <div>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
