import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MatchingPage from './pages/MatchingPage';
import { Typography } from '@material-tailwind/react';

function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
    <Router>
      <div className="w-min-full">
        {/* Header and Navbar */}
        <nav className="flex justify-between pl-4 pr-4 bg-black h-14 items-center mb-6">
          <div>
            <Typography color="white" variant="lead">
              Welcome to Matching System
            </Typography>
          </div>
          {/* Navigation Links */}
          <div className="flex gap-4 text-white">
            <Link to="/step-1">Home</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate replace to="/step-1" />} />
          <Route path="/:step" element={<MatchingPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <footer className="w-min-full h-16 bg-black flex items-center justify-center mt-6">
        <p className="flex gap-2 text-white">
          All rights reserverd to Lucas Santana
        </p>
      </footer>
    </Router>
  );
}

export default App;
