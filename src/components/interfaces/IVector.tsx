interface IVector {
	x?:number;
	y?:number;
	z?:number;
	w?:number;
	a?:number;
	b?:number;
	c?:number;
	d?:number;
	mag(): number;
	add(): number;
	mult(): number;
	dot(): number;
	cross(): number;
}

export default IVector;