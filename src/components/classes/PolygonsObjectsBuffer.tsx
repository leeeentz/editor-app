import IObjects2DBuffer from "../interfaces/IObjects2DBuffer";
import Polygon from "./Polygon";

// A far more encapsulated class for querying and manipulating objects.
// Using concrete implementation 'for now'
class PolygonObjectsBuffer implements IObjects2DBuffer {
	//private indexes: Array<number>;
	private indexes: Set<number>
	private objects?: Map<number, Polygon>;

    // Please declare
	constructor(){
		this.indexes = new Set();
	}

    // Must certainly ruturn a Polygon (seriously, make sure of that)
    getObjectByIndex(index: number): Polygon {
        if (!this.objects) {
            throw new Error("Objects map is undefined. Cannot retrieve polygon");
        }

        const tmpPolygon = this.objects.get(index);
        
        if (!tmpPolygon) {
            throw new Error(`No polygon found at index ${index}`);
        }

        return tmpPolygon; // Black magic
    }

	updateObjectByIndex(index: number, obj: Polygon): void {
        // Make some checks but doesn't really care for the implementation
		if (!this.objects) {
			throw new Error("objects map is undefined. Aborting routine.");
		}

		if (!this.objects.get(index)) {
			throw new Error("index returned invalid object. Aborting routine.");
		}

		this.objects.set(index, obj); // JS take care of the upsert for me
	}

	getObjectsArray(): Array<Polygon> {
		const tmpObjectsArray: Array<Polygon> = [];

		if (this.indexes.size === 0) {
			throw new Error("There are no indexes to query. Returning empty array");
		}

		if (!this.objects) {
			throw new Error("Objects map is undefined. Returning empty array");
		}

		for (let n of this.indexes) {

			if (!this.objects.get(n)) {
				console.warn("query returned undefined object. Breaking.");
				break;
			}

			if (this.objects.get(n) !== undefined) { // Map.get(index) may return an object undefined. Like wtf?
				const tmpObject:Polygon = this.objects.get(n) as Polygon; // Aliasing for tricking the linter
				tmpObjectsArray.push(tmpObject); // Black magic
			}			
		}
		return tmpObjectsArray;
	}

    getIndexesArray(): Array<number> {
        return new Array<number>(); // Temporary so the linter stop bitching
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


}

export default PolygonObjectsBuffer;