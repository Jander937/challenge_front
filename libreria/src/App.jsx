import React, { useState } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cards from './components/Cards/Cards'

const handleBookCreated = () => {
  fetchData(); // Fetch the updated book list after a new book is created
};


function App() {
  return (
<>
<Cards/>
</>
  )
}

export default App
