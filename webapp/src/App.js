import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {Route, Routes } from "react-router-dom";
import About from "./components/About";
import AddStudent from "./components/AddStudent";
import Footer from "./components/Footer";


function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/addStudent" element={<AddStudent />} />
        <Route exact path="/editStudent/:id" element={<AddStudent />} />
      </Routes> 
      <Footer />   
    </>
  );
}

export default App
