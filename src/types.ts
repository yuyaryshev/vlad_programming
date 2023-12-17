export interface Vector2D {
	x:number;
	y:number;
}

export interface GameObject extends Vector2D {
	x:number;
	y:number;
	s:string;
	v?:Vector2D;
}

export interface MyDocument extends Document{
	memoField:  HTMLTextAreaElement;
	dataField: HTMLTextAreaElement;
	gameObjects: {[key:string]:GameObject};
}
