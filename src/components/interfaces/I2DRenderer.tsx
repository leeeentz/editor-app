import IObject2D from "./IObject2D";

interface I2DRenderer {
    displayObjects(viewContext: string, renderingObjectsBuffer: Array<IObject2D>): void;
    isInitialized: boolean;

    initialize(p: any):void;
}
export default I2DRenderer;