import React, { useEffect, useRef, useState } from 'react';
import Sketch from 'react-p5';
import type P5 from "p5";
import Vec2 from './classes/Vec2';
import PolygonFactory from './classes/PolygonFactory';
import PolygonRenderer from './classes/PolygonRenderer';
import IAppCanvasProps from './interfaces/IAppCanvasProps';
import Polygon from './classes/Polygon';
import IObject2D from './interfaces/IObject2D';
import IPolygon from './interfaces/IPolygon';

interface ITool {

}
class CreationTool implements ITool {
	tmpVertices: Array<Vec2>;
	isDrawing: boolean;

	constructor () {
		this.tmpVertices = [];
		this.isDrawing = false;
	}
}

interface IObjects2DBuffer {
	getObjectByIndex(): IObject2D;
	updateObjectByIndex(index: number, obj: IObject2D): void;/////
	getObjectsArray(): Array<IObject2D>;
	destroyObjectByIndex(): void;
}

/* class PolygonObjectsBuffer implements IObjects2DBuffer {
	private indexes: Array<number>;
	private objects?: Map<number, IPolygon>;

	constructor(){
		this.indexes = [];
	}

	updateObjectByIndex(index: number, obj: IPolygon): void {
		if (!this.objects) {
			console.warn("objects map is undefined. Aborting routine.");
			return;
		}

		if (!this.objects.get(index)) {
			console.warn("index returned invalid object. Aborting routine.");
			return;
		}

		this.objects.set(index, obj);
	}
} */

function AppCanvas({canvasWidth, canvasHeight, viewContext}: IAppCanvasProps) {
	const [key, setKey] = useState(0);

	const timeRef = useRef(0);
	const myRendererRef = useRef<PolygonRenderer | null>(null);

	const renderer = new PolygonRenderer();

	const sceneObjects: Array<Polygon> = [];


	// Tem que ter um array de índices para consultar o buffer
	// Tem que ser um mapa id-objeto
	//const objectsBuffer: Map<number,

	const newPolygon = React.useMemo(() => {
		return PolygonFactory.createPolygon(new Vec2(400, 300), 100, 4);
	}, []);

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

	sceneObjects.push(newPolygon);

	const setup = (p:P5, canvasParentRef:any) => {
		//p.frameRate(6);
		p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p.background(255);

		renderer.initialize(p);

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

		for (const obj of sceneObjects) {
			obj.transforms.rotation.z += 0.005;
		}

		//sceneObjects[0].vertices[0].x = p.mouseX;
		//sceneObjects[0].vertices[0].y = p.mouseY;

		renderer.displayObjects(viewContext, sceneObjects);
		timeRef.current += 1;
	};

	const mouseClicked = (p:P5) => {
		console.log("click");
		const renderer = myRendererRef.current;

		if (!renderer) {
			console.warn("Renderer not initialized");
			return;
		}
		sceneObjects.push(PolygonFactory.createPolygon(new Vec2(p.mouseX, p.mouseY), Math.random() * 100, Math.ceil((Math.random() * 6)) + 2));
	};

	return (
		<div style={{ border: '1px solid #000000', width: canvasWidth, height: canvasHeight }}>
			<Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
		</div>
	);
}

export default AppCanvas;