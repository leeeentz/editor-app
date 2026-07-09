import I2DRenderer from "../interfaces/I2DRenderer";
import IPolygon from "../interfaces/IPolygon";
import type P5 from "p5";

class PolygonRenderer implements I2DRenderer {
    p?: P5;
    isInitialized: boolean;

    constructor() {
        this.isInitialized = false;
    }

    initialize(p: P5) {
        if (!p) {
            console.log("Invalid or null P5 instance");
            return;
        }
        this.p = p;
        this.isInitialized = true;
        console.log("PolygonRenderer is initialized");
    }

    displayObjects(viewContext:string, renderingObjectsBuffer: Array<IPolygon>): void {
        if (!this.isInitialized || !this.p) {
            console.warn("Renderer is not initialized");
            return;
        }

        if (renderingObjectsBuffer.length === 0) {
            console.log("No active objects to display");
            return;
        }

        for (let obj of renderingObjectsBuffer) {
            if (!obj.origin) {
                console.log("Origin is undefined. Jumping to next object.");
                break;
            }

            this.p.push();
            this.p.translate(obj.origin.x, obj.origin.y);
            this.p.scale(obj.transforms.scale.x, obj.transforms.scale.y);
            this.p.rotate(obj.transforms.rotation.z);
            this.p.translate(- obj.origin.x, - obj.origin.y);

            if (viewContext === "selection") {
                this.p.fill(100, 150, 255);
            } else if (viewContext === "creation") {
                this.p.fill(150, 150, 150);
            } else if (viewContext === "panning") {
                this.p.fill(150, 100, 120);
            } else {
                this.p.fill(120, 160, 110);
            }

            this.p.beginShape();
            for (let v of obj.vertices) {
                this.p.vertex(v.x, v.y);
            }
            this.p.endShape(this.p.CLOSE);
            this.p.pop();
        }
    }
}

export default PolygonRenderer;