import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth'; // Adjust the path accordingly
import SearchTrains from './search';
import Profile from './profile';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/search" element={<SearchTrains />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
};

export default App;