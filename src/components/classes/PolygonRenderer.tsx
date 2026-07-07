import I2DRenderer from "../interfaces/I2DRenderer";
import Polygon from "./Polygon";

class PolygonRenderer implements I2DRenderer {
    activeObjects: Array<Polygon>;
    p: any;

    constructor(p: any) {
        this.activeObjects = [];
        this.p = p;
    }

    displayObjects(): void {
        if (this.activeObjects.length === 0) {
            console.log("No active objects to display");
            return;
        }

        for (let obj of this.activeObjects) {
            this.p.push();
            this.p.translate(obj.origin.x, obj.origin.y);
            this.p.scale(obj.transforms.scale.x, obj.transforms.scale.y);
            this.p.rotate(obj.transforms.rotation.z);
            this.p.translate(-obj.origin.x, -obj.origin.y);
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