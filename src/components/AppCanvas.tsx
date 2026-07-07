import React from 'react';
import Sketch from 'react-p5';
import Vec2 from './classes/Vec2';
import Polygon from './classes/Polygon';
import PolygonFactory from './classes/PolygonFactory';
import PolygonRenderer from './classes/PolygonRenderer';

function AppCanvas(props: { canvasWidth: number, canvasHeight: number }) {

	let canvasWidth = props.canvasWidth;
	let canvasHeight = props.canvasHeight;

	let time = 0;

	let myPolygon:Polygon = PolygonFactory.createSquare(new Vec2(200, 300), 100);
	myPolygon.setOriginToCenter();

	let myPolygon_02:Polygon = PolygonFactory.createPolygon(new Vec2(400, 300), 100, 4);

	let myRenderer:PolygonRenderer;

	const setup = (p:any, canvasParentRef:any) => {
		p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p.background(255);
		myRenderer = new PolygonRenderer(p);
		myRenderer.activeObjects.push(myPolygon);
		myRenderer.activeObjects.push(myPolygon_02);
		console.log("Setup done");
	};

	const draw = (p:any) => {
		p.background(240);
		p.fill(100, 150, 255);
		p.noStroke();
		myPolygon.transforms.rotation.z = time * 0.01;
		myPolygon_02.transforms.rotation.z += 0.002;
		myRenderer.displayObjects();
		time += 1;
	};

	return (
		<div style={{ border: '1px solid #000000', width: canvasWidth, height: canvasHeight }}>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}

export default AppCanvas;