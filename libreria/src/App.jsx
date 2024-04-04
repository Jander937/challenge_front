import React, { useState } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from './components/Cards/Cards'
import CreateBookButton from './components/CreateBookButton/CreateBookButton'
import Carouse from "./components/Carousel/Carouse";

const handleBookCreated = () => {
  fetchData(); // Fetch the updated book list after a new book is created
};


function App() {
  return (
<>
<Carouse/>
  <CreateBookButton onBookCreated={handleBookCreated} />
<Cards/>
</>
  )
}

export default App
