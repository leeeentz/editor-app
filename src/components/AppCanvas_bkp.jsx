import React from 'react';
import Sketch from 'react-p5';

function AppCanvas(props) {

	let canvasWidth = props.canvasWidth;
  	let canvasHeight = props.canvasHeight;

	class Polygon {
		constructor(origin, vertices) { 
			this.origin = origin;
			this.vertices = vertices;
			this.transforms = {
				scale: { x: 1, y: 1 },
				rotation: 0,
				translation: { x: 0, y: 0 }
			}
		}

		display(p) {
			p.push();
			p.translate(this.origin.x, this.origin.y);
			p.scale(this.transforms.scale.x, this.transforms.scale.y);
			p.rotate(this.transforms.rotation);
			p.translate(-this.origin.x, -this.origin.y);
			p.beginShape();
			for (let v of this.vertices) {
				p.vertex(v.x, v.y);
			}
			p.endShape(p.CLOSE);
			p.pop();
		}

		setOriginToCenter() {
			let minX = Math.min(...this.vertices.map(v => v.x));
			let maxX = Math.max(...this.vertices.map(v => v.x));
			let minY = Math.min(...this.vertices.map(v => v.y));
			let maxY = Math.max(...this.vertices.map(v => v.y));
			this.origin.x = (minX + maxX) / 2;
			this.origin.y = (minY + maxY) / 2;
		}

		setOrigin(origin) {
			this.origin = origin;
		}
	}

	class DisplayMachine {
		displayObject(object) {
			object.display();
		}

		displayObjectArray(objectArray) {
			if (objectArray.length === 0) {
				console.log('objectArray is empty');
				return 0;
			}
			for(let obj of objectArray) {
				this.displayObject(obj);
			}
		}
	}


	class PolygonFactory {
		static createSquare(origin, size) {
			// vertices should be relative to the origin since display() translates by origin
			let tmpPolygon = new Polygon(origin, [
				{ x: 0, y: 0 },
				{ x: size, y: 0 },
				{ x: size, y: size },
				{ x: 0, y: size }
			]);
			return tmpPolygon;
		}
	}

  let time = 0;
  
	let myPolygon = PolygonFactory.createSquare({ x: 200, y: 300 }, 100);
	myPolygon.setOriginToCenter();

  const setup = (p, canvasParentRef) => {
    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p.background(255);
  };

  const draw = (p) => {
    p.background(240);
    p.fill(100, 150, 255);
    p.noStroke();
    p.ellipse(p.width / 2, p.height / 2 + Math.sin(time * 0.1) * 50, 100, 100);
		myPolygon.transforms.rotation = time * 0.01;
		myPolygon.display(p);
    time += 1;
  };

  return (
    <div style={{ border: '1px solid #000000', width: canvasWidth, height: canvasHeight }}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default AppCanvas;