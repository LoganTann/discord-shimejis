export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export class Rect implements Rectangle {
    right: number;
    bottom: number;
    constructor(
        public top: number,
        public left: number,
        public width: number,
        public height: number
    ) {
        this.right = left + width;
        this.bottom = top + height;
    }
    static fromElement(elem: HTMLElement): Rectangle {
        const boundingClientRect = elem.getBoundingClientRect();

        return new Rect(
            boundingClientRect.top,
            boundingClientRect.left,
            boundingClientRect.width,
            boundingClientRect.height
        );
    }
}
