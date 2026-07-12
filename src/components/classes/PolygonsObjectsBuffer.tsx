import IObjects2DBuffer from "../interfaces/IObjects2DBuffer";
import Polygon from "./Polygon";

// A far more encapsulated class for querying and manipulating objects.
// Using concrete implementation 'for now'
class PolygonObjectsBuffer implements IObjects2DBuffer {
	private indexes: Set<number> // Using a set so it automatically handles duplicates for me
	private objects: Map<number, Polygon>; 

	constructor(){
		this.indexes = new Set();
        this.objects = new Map<number, Polygon>();
	}

    // Must certainly ruturn a Polygon (seriously, make sure of that)
    getObjectByIndex(index: number): Polygon {
        if (!this.objects) {
            throw new Error("Objects map is undefined. Cannot retrieve polygon");
        }

        if (!this.indexes.has(index)) {
            throw new Error("Input is out of indexes set.");
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
        this.indexes.add(index);
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

			if (this.objects.get(n) !== undefined) { // Map.get(index) may return an object or undefined. Like wtf?
				const tmpObject:Polygon = this.objects.get(n) as Polygon; // Aliasing for tricking the linter
				tmpObjectsArray.push(tmpObject); // Black magic
			}			
		}
		return tmpObjectsArray;
	}

    destroyObjectByIndex(index: number): number {
        this.indexes.delete(index);
        return -1;
    }

	getIndexesSetAsArray(): Array<number> {
		const tmpArray: Array<number> = [];
		if (this.indexes.size === 0) {
			console.warn("Indexes set is empty. Returning empty array");
			return new Array<number>();
		}

        for (let n of this.indexes) {
            tmpArray.push(n);
        }
		return tmpArray;
	}

    addObject(obj: Polygon): number {
        let newIndex = -1;
        for (let n of this.indexes) {
            if (!this.indexes.has(n + 1)) {
                this.indexes.add(n + 1);
                this.objects.set(n + 1, obj);
                newIndex = n + 1;
            }
        }
        return newIndex;
    }

}

export default PolygonObjectsBuffer;