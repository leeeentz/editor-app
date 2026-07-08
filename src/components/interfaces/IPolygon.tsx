import IObject2D from "./IObject2D";
import IVector from "./IVector";

interface IPolygon extends IObject2D {
    vertices: Array<IVector>;
    color?: string;
}
export default IPolygon;