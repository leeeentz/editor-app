import IObjects2DBuffer from "../interfaces/IObjects2DBuffer";
import Polygon from "./Polygon";

// A far more encapsulated class for querying and manipulating objects
class PolygonObjectsBuffer implements IObjects2DBuffer {
	//private indexes: Array<number>;
	private indexes: Set<number>
	private objects?: Map<number, Polygon>;

	constructor(){
		this.indexes = new Set();
	}

	getIndexesSetAsArray(): Array<number> {
		const tmpArray: Array<number> = [];
		if (this.indexes.size === 0) {
			console.log("Indexes set is empty. Returning empty array");
			return new Array<number>();
		}

		const setIterator = this.indexes.values();
		for (let i = 0; i < this.indexes.size; i ++) {
			const currentIndex = setIterator.next().value;
			tmpArray.push(currentIndex);
		}
		return tmpArray;
	}

	getObjectsArray(): Array<Polygon> {
		const tmpObjectsArray: Array<Polygon> = [];

		if (this.indexes.size === 0) {
			console.warn("There are no indexes to query. Returning empty array");
			return tmpObjectsArray;
		}

		if (!this.objects) {
			console.warn("Objects map is undefined. Returning empty array");
			return tmpObjectsArray;
		}

		for (let n of this.indexes) {

			if (!this.objects.get(n)) {
				console.warn("query returned undefined object. Breaking.");
				break;
			}

			if (this.objects.get(n) !== undefined) { // Precisar fazer isso porque o typescript não entende que o get() pode retornar undefined e isso deveria ser crime. Tomarnocu, carai. O método retorna uma coisa ou outra? Pqp
				const tmpObject:Polygon = this.objects.get(n) as Polygon; // Botar essa dsgrç de as Polygon pra forçar o linter.
				tmpObjectsArray.push(tmpObject); // E que Deus abençoe o javascript. Não é mesmo?
			}			
		}
		return tmpObjectsArray;
	}

	updateObjectByIndex(index: number, obj: Polygon): void {
		if (!this.objects) {
			console.warn("objects map is undefined. Aborting routine.");
			return;
		}

		if (!this.objects.get(index)) {
			console.warn("index returned invalid object. Aborting routine.");
			return;
		}

		this.objects.set(index, obj);
	}
}

export default PolygonObjectsBuffer;