import Vec2 from "./Vec2";
import Polygon from "./Polygon";

class PolygonFactory {
    static createSquare(origin: Vec2, size: number): Polygon {
        let tmpPolygon = new Polygon(origin, [
            new Vec2(origin.x, origin.y),
            new Vec2(origin.x + size, origin.y),
            new Vec2(origin.x + size, origin.y + size),
            new Vec2(origin.x, origin.y + size)
        ]);
        return tmpPolygon;
    }

    static createPolygon(origin: Vec2, radius: number, sides: number): Polygon {
        let vertices: Array<Vec2> = [];
        let angleStep = 2 * Math.PI / sides;
        for (let i = 0; i < sides; i++) {
            let vertex: Vec2;
            let angle = i * angleStep;
            vertex = new Vec2(origin.x + Math.cos(angle) * radius, origin.y + Math.sin(angle) * radius);
            vertices.push(vertex);
        }
        return new Polygon(origin, vertices);
    }
}
export default PolygonFactory;