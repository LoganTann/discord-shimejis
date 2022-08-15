import { Ibehavior } from "../behaviors/Ibehavior";
import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Ianimation";

export class IdleNormal implements Ianimation {
    name = "idle normal";
    mascot!: Mascot;
    next?: Ianimation;
    behavior!: Ibehavior;

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.setFrame("shime1.png");
    }
    destroy(): void {}
    generateNext(): void {}
}
