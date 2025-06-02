import React, { useState } from 'react';
import translate from 'translate';
import './App.css';
import { HomePage } from './Components/homePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Components/header';
import { Changer } from './Components/changer';
import { Summarization } from './Components/summarization';
import { Login } from './Components/login';
import { Register } from './Components/register';
function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/changer" element={<Changer />} />
            <Route path="/summarization" element={<Summarization />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
