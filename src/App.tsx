import React from 'react';
import './App.css';
import AppCanvas from './components/AppCanvas';
import ToolBar from './components/ToolBar';

const APP_WIDTH: number = 800;
const APP_HEIGHT: number = 600;

let viewContext: string = "selection";

function App() {
	return (
	<div className="App">
		<ToolBar viewContext={viewContext}/>
		<AppCanvas canvasWidth={APP_WIDTH} canvasHeight={APP_HEIGHT} />
    </div>
	);
}

export default App;
