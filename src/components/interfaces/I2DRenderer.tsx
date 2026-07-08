import IObject2D from "./IObject2D";

interface I2DRenderer {
    activeObjects: Array<IObject2D>;
    displayObjects(viewContext: string): void;
}
export default I2DRenderer;