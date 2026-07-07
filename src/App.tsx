import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppCanvas from './components/AppCanvas';

const APP_WIDTH:number = 800;
const APP_HEIGHT:number = 600;

function App() {
  return (
    <div className="App">
      <AppCanvas canvasWidth={APP_WIDTH} canvasHeight={APP_HEIGHT} />
    </div>
  );
}

export default App;
