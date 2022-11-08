import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <label htmlFor='file-upload'>Upload a file:</label>
        <input type='file' id='file-upload' name='file-upload' />
      </header>
    </div>
  )
}

export default App;
