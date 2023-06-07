//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  console.log('Rendering App component');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            {/* Other routes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
