import IVector from "../interfaces/IVector";
class Vec2 implements IVector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    mag(): number { return 0; }
    add(): number { return 0; }
    mult(): number { return 0; }
    dot(): number { return 0; }
    cross(): number { return 0; }
}
export default Vec2;