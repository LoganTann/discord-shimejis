import { Ibehavior } from "../behaviors/Ibehavior";
import { IdleBehavior } from "../behaviors/IdleBehavior";
import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Ianimation";

export class IdleAnim implements Ianimation {
    name = "idle normal";
    mascot!: Mascot;
    next?: Ianimation;
    behavior!: Ibehavior;

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();

        this.mascot.setBehavior(new IdleBehavior());

        this.mascot.canvas.setFrame("shime1.png");
    }
    destroy(): void {}
    generateNext(): void {}
}
