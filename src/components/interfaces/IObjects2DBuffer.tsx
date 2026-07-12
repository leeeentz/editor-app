import IObject2D from "./IObject2D";

interface IObjects2DBuffer {
	getObjectByIndex?(): IObject2D;
	updateObjectByIndex?(index: number, obj: IObject2D): void;
	getObjectsArray?(): Array<IObject2D>;
	getIndexesArray?(): Array<number>;
	destroyObjectByIndex?(): void;
	getIndexesSetAsArray?(): Array<number>
}

export default IObjects2DBuffer;