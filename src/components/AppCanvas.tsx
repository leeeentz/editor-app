import React, { useEffect, useRef, useState } from 'react';
import Sketch from 'react-p5';
import type P5 from "p5";
import Vec2 from './classes/Vec2';
import PolygonFactory from './classes/PolygonFactory';
import PolygonRenderer from './classes/PolygonRenderer';
import IObject2D from './interfaces/IObject2D';

interface AppCanvasProps {
	canvasWidth: number;
	canvasHeight: number;
	viewContext: string;
}

function AppCanvas({canvasWidth, canvasHeight, viewContext}: AppCanvasProps) {
	const [key, setKey] = useState(0);
	const timeRef = useRef(0);
	const myRendererRef = useRef<PolygonRenderer | null>(null);

	const sceneObjects: Array<IObject2D> = [];

	const renderer = new PolygonRenderer();

	const myPolygon = React.useMemo(() => {
		const tmpPolygon = PolygonFactory.createSquare(new Vec2(200, 300), 100);
		tmpPolygon.setOriginToCenter();
		return tmpPolygon;
	}, []);

	const myPolygon_02 = React.useMemo(() => {
		const tmpPolygon = PolygonFactory.createPolygon(new Vec2(400, 300), 100, 4);
		return tmpPolygon;
	}, []);

	useEffect(() => {
		setKey(prev => prev + 1);
		console.log(`Context changed to: ${viewContext}`);
	}, [viewContext]);

	const setup = (p:P5, canvasParentRef:any) => {
		p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p.background(255);

		renderer.initialize(p);

		renderer.pushObject2DToRenderingBuffer(myPolygon);
		renderer.pushObject2DToRenderingBuffer(myPolygon_02);

		myRendererRef.current = renderer;

		timeRef.current = 0;

		p.fill(100, 150, 255);

		console.log("Setup done");
	};

	const draw = (p:P5) => {
		const renderer = myRendererRef.current;

		if (!renderer) {
			console.warn("Renderer is undefined");
			return;
		}

		p.background(240);
		
		p.noStroke();

		for (const obj of renderer.renderingObjectsBuffer) {
			obj.transforms.rotation.z += 0.005;
		}

		renderer.displayObjects(viewContext);
		timeRef.current += 1;
	};

	const mouseClicked = (p:P5) => {
		console.log("click");
		const renderer = myRendererRef.current;

		if (!renderer) {
			console.warn("Renderer not initialized");
			return;
		}
		renderer.pushObject2DToRenderingBuffer(PolygonFactory.createPolygon(new Vec2(p.mouseX, p.mouseY), Math.random() * 100, Math.ceil((Math.random() * 6)) + 2));
	};

	return (
		<div style={{ border: '1px solid #000000', width: canvasWidth, height: canvasHeight }}>
			<Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
		</div>
	);
}

export default AppCanvas;