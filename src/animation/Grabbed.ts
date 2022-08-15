import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Animation_Defs";

export class GrabbedNormal implements Ianimation {
    name = "grabbed normal";
    mascot!: Mascot;
    next?: Ianimation;

    public isRight: boolean;
    public requestId?: number;

    constructor(isRight: boolean) {
        this.isRight = isRight;
    }
    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.setFrame(this.getFrame());
    }
    destroy(): void {
        if (this.requestId) {
            clearTimeout(this.requestId);
        }
    }
    generateNext(): void {}
    getFrame() {
        return "shime1.png";
    }
}

export class GrabbedFast extends GrabbedNormal {
    name = "grabbed fast";
    getFrame(): string {
        return this.isRight ? "shime10.png" : "shime9.png";
    }
    generateNext(): void {
        this.next = new GrabbedSlow(this.isRight);
        this.requestId = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 500);
    }
}

export class GrabbedSlow extends GrabbedNormal {
    name = "grabbed slow";
    getFrame(): string {
        return this.isRight ? "shime8.png" : "shime7.png";
    }
    generateNext(): void {
        this.next = new GrabbedNormal(this.isRight);
        this.requestId = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 350);
    }
}
