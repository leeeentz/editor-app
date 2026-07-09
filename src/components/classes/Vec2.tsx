import IVector from "../interfaces/IVector";
class Vec2 implements IVector {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.z = 0;
        this.w = 0;
    }

    mag(): number { return 0; }
    add(): number { return 0; }
    mult(): number { return 0; }
    dot(): number { return 0; }
    cross(): number { return 0; }
}
export default Vec2;