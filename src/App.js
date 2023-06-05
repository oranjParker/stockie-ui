//App.js
import React from 'react';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

function App() {
  console.log('Rendering App component');

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        {/* Rest of your app */}
      </div>
    </AuthProvider>
  );
}

export default App;
