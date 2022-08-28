import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";

export class ThrownFallNormal implements Ianimation {
    name = "thrown fall normal";
    mascot!: Mascot;
    next?: Ianimation;

    constructor(public isRight = false) {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.reversed = this.isRight;
        this.mascot.canvas.setFrame("shime4.png");
    }
    destroy(): void {}
    generateNext(): void {
        this.next = new ThrownFallBumpFloor(this.isRight);
    }
}

export class ThrownFallBumpFloor implements Ianimation {
    name = "thrown fall bump floor";
    mascot!: Mascot;
    next?: Ianimation;

    private requestId: number = 0;
    constructor(public isRight = false) {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.reversed = this.isRight;
        this.mascot.canvas.setFrame("shime45.png");
    }
    destroy(): void {
        if (this.requestId) {
            clearTimeout(this.requestId);
        }
    }
    generateNext(): void {
        this.next = new IdleNormal(this.isRight);
        this.requestId = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 350);
    }
}
