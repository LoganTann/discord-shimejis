import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Animation_Defs";

export class IdleNormal implements Ianimation {
    name = "idle normal";
    mascot!: Mascot;
    next?: Ianimation;

    constructor(public isRight = false) {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.setFrame("shime1.png");
    }
    destroy(): void {}
    generateNext(): void {}
}
