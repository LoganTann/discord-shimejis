import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";

export class ThrownFlyNormal implements Ianimation {
    name = "thrown fly normal";
    mascot!: Mascot;
    next?: Ianimation;

    static poissonMode = false;

    constructor(public isRight = false) {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.reversed = this.isRight;
        this.mascot.canvas.setFrame(
            ThrownFlyNormal.poissonMode ? "enepoisson.png" : "shime22.png"
        );
    }
    destroy(): void {}
    generateNext(): void {
        this.next = new ThrownFlyBumpFloor(this.isRight);
    }
}

export class ThrownFlyBumpFloor implements Ianimation {
    name = "thrown fly bump floor";
    mascot!: Mascot;
    next?: Ianimation;

    private requestId: number = 0;
    private intervalId: number = 0;
    constructor(public isRight = false) {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.generateNext();
        this.mascot.canvas.reversed = this.isRight;

        const frames = "19 18".split(" ");
        let i = 0;
        this.intervalId = window.setInterval(() => {
            if (i < frames.length) {
                this.mascot.canvas.setFrame(`shime${frames[i]}.png`);
                i++;
            }
        }, 250);
        this.mascot.canvas.setFrame("shime18.png");
    }
    destroy(): void {
        if (this.requestId) {
            clearTimeout(this.requestId);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    generateNext(): void {
        this.next = new IdleNormal(this.isRight);
        this.requestId = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 1200);
    }
}
