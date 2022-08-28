import { Mascot } from "../mascot/Mascot";
import {
    globalMainIdleWaitingTime,
    Ianimation,
    SingleAnimationAbstract,
} from "./Animation_Defs";
import { IdleSits } from "./IdleSits";

export class IdleSitsOnTchat extends SingleAnimationAbstract {
    name = "idle sits on tchat";
    requestID = 0;
    secondFrame = 0;

    init(mascot: Mascot) {
        super.init(mascot);
        this.mascot.canvas.translateOffset.y = 14;
        this.mascot.canvas.flushPosition();
        this.secondFrame = window.setTimeout(() => {
            this.mascot.canvas.setFrame("shime31.png");
        }, 1000);
    }
    destroy(): void {
        super.destroy();
        clearTimeout(this.requestID);
        clearTimeout(this.secondFrame);
        this.mascot.canvas.translateOffset.y = 0;
        this.mascot.canvas.flushPosition();
    }
    generateNext(): void {
        this.next = this.getNextAnim();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, globalMainIdleWaitingTime);
    }
    getFrame(): string {
        return "shime30.png";
    }
    getNextAnim(): Ianimation {
        if (Math.random() > 0.5) {
            return new IdleSits();
        }
        return new IdleSitsTchatAndMoveLegs();
    }
}

export class IdleSitsTchatAndMoveLegs extends SingleAnimationAbstract {
    name = "idle sits tchat and move legs";
    requestID = 0;
    intervalID = 0;
    destroyed = false;

    init(mascot: Mascot) {
        super.init(mascot);
        this.mascot.canvas.translateOffset.y = 14;
        this.mascot.canvas.flushPosition();
        const frames = "31 32 31 33".split(" ");
        let i = 0;
        this.intervalID = window.setInterval(() => {
            if (!this.destroyed) {
                this.mascot.canvas.setFrame(`shime${frames[i]}.png`);
                i = (i + 1) % frames.length;
            }
        }, 1500);
    }
    destroy(): void {
        this.destroyed = true;
        clearTimeout(this.requestID);
        clearInterval(this.intervalID);
        this.mascot.canvas.translateOffset.y = 0;
        this.mascot.canvas.flushPosition();
    }
    generateNext(): void {
        this.next = this.getNextAnim();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 15000);
    }
    getFrame(): string {
        return "shime33.png";
    }

    getNextAnim(): Ianimation {
        return new IdleSitsOnTchat();
    }
}
