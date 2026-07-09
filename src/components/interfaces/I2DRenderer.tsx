import IObject2D from "./IObject2D";

interface I2DRenderer {
    renderingObjectsBuffer: Array<IObject2D>;
    displayObjects(viewContext: string): void;
    isInitialized: boolean;

    initialize(p: any):void;
    pushObject2DToRenderingBuffer(obj: IObject2D): void;
}
export default I2DRenderer;