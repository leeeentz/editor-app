import IObject2D from "./IObject2D";

interface IObjects2DBuffer {
	getObjectByIndex(index: number): IObject2D;
	updateObjectByIndex(index: number, obj: IObject2D): void;
	getObjectsArray(): Array<IObject2D>;
	destroyObjectByIndex(index: number): number;
	getIndexesSetAsArray(): Array<number>;
	addObject(obj: IObject2D): number;
}

export default IObjects2DBuffer;