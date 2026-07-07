import Vec2 from "../classes/Vec2";
import ITransforms from "./ITransforms";

interface IObject2D {
    origin: Vec2;
    transforms: ITransforms;
    type: string;
}

export default IObject2D