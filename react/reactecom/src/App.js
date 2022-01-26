import React from 'react';
import {BrowserRouter, BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import MasterLayout from './layouts/admin/MasterLayout';

 
 function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<MasterLayout />} />
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/profile" element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
