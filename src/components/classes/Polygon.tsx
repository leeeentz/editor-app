import ITransforms from "../interfaces/ITransforms";
import IPolygon from "../interfaces/IPolygon";
import IVector from "../interfaces/IVector";

class Polygon implements IPolygon {
    origin: IVector;
    vertices: Array<IVector>;
    transforms: ITransforms;
    color?: string;
    type: string;

    constructor(origin: IVector, vertices: Array<IVector>) {
        this.type = "polygon";
        this.origin = origin;
        this.vertices = vertices;
        this.transforms = {
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            translation: {
                x: origin.x,
                y: origin.y,
                z: 0
            }
        }
    }

    setOriginToCenter() {
        let minX = Math.min(...this.vertices.map(v => v.x));
        let maxX = Math.max(...this.vertices.map(v => v.x));
        let minY = Math.min(...this.vertices.map(v => v.y));
        let maxY = Math.max(...this.vertices.map(v => v.y));
        this.origin.x = (minX + maxX) / 2;
        this.origin.y = (minY + maxY) / 2;
    }

    setOrigin(origin: IVector) {
        this.origin = origin;
    }
}

export default Polygon;