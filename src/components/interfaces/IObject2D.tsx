import ITransforms from "./ITransforms";
import IVector from "./IVector";

interface IObject2D {
    origin: IVector;
    transforms: ITransforms;
    type: string;
}

export default IObject2D