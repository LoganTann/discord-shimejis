import { Mascot } from "../mascot/Mascot";

export interface Ianimation {
    name: string;
    init(mascot: Mascot): void;
    destroy(): void;

    generateNext(): void;
    next?: Ianimation;
}

export abstract class SingleAnimationAbstract implements Ianimation {
    mascot!: Mascot;
    next?: Ianimation;

    constructor(public isRight = false) {}
    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.setFrame(this.getFrame());
    }
    destroy(): void {}

    abstract name: string;
    abstract generateNext(): void;
    abstract getFrame(): string;
}

export class FramesManager {
    frames: string[] = [];
    intervalId: number = 0;
    constructor(framesStr: string, private interval = 250) {
        this.frames = framesStr.split(" ");
    }

    init(mascot: Mascot) {
        let i = 0;
        this.intervalId = setInterval(() => {
            if (i < this.frames.length) {
                mascot.canvas.setFrame(`shime${this.frames[i]}.png`);
                i++;
            }
        }, this.interval);
    }

    destroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
