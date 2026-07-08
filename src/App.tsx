import React, { useState } from 'react';
import './App.css';
import AppCanvas from './components/AppCanvas';
import ToolBar from './components/ToolBar';

const APP_WIDTH: number = 800;
const APP_HEIGHT: number = 600;

function App() {
	const [viewContext, setViewContext] = useState<string>("selection");

	const handleContextChange = (newContext: string) => {
		setViewContext(newContext);
		console.log(`Context changed to ${newContext}`);
	}

	return (
	<div className="App">
		<ToolBar
			onContextChange = {handleContextChange}
			currentContext = {viewContext}
		/>
		<AppCanvas
			canvasWidth={APP_WIDTH}
			canvasHeight={APP_HEIGHT}
			viewContext = {viewContext}
		/>
    </div>
	);
}

export default App;
