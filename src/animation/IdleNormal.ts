import { ThrownBehavior } from "../behaviors/ThrownBehavior";
import { Mascot } from "../mascot/Mascot";
import { Ianimation } from "./Animation_Defs";
import { IdleFish } from "./IdleFish";
import { IdlePoint } from "./IdlePoint";
import { IdleSits } from "./IdleSits";
import { IdleSitsOnTchat } from "./IdleSitsOnTchat";
import { IdleSmug } from "./IdleSmug";

export class IdleNormal implements Ianimation {
    name = "idle normal";
    mascot!: Mascot;
    next?: Ianimation;
    requestId = 0;

    constructor(public isRight = false) {}

    static jumpProbability = 0.8;

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.mascot.canvas.setFrame("shime1.png");
        this.generateNext();
    }
    destroy(): void {
        clearTimeout(this.requestId);
    }
    generateNext(): void {
        if (Math.random() > IdleNormal.jumpProbability) {
            this.mascot.canvas.position.y -= 20;
            this.mascot.canvas.flushPosition();
            this.mascot.setBehavior(
                new ThrownBehavior({
                    x: Math.random() > 0.5 ? -30 : 30,
                    y: -20,
                })
            );
            return;
        }
        this.next = this.getNextStandupAnim();

        this.requestId = setTimeout(() => {
            if (this.next) {
                this.mascot.setAnimation(this.next);
            }
        }, 1000);
    }

    getNextStandupAnim(): Ianimation | undefined {
        const standupAnims: Ianimation[] = [
            new IdleSmug(),
            new IdlePoint(),
            new IdleFish(this.isRight),
            new IdleSitsOnTchat(),
        ];
        if (Math.random() > 0.75) {
            return new IdleSits();
        }
        return standupAnims[Math.floor(Math.random() * standupAnims.length)];
    }
}
