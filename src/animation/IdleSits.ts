import { Mascot } from "../mascot/Mascot";
import {
    FramesManager,
    globalMainIdleWaitingTime,
    Ianimation,
    SingleAnimationAbstract,
} from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";
import { IdleSitsOnTchat } from "./IdleSitsOnTchat";

export class IdleSits extends SingleAnimationAbstract {
    name = "idle sits";
    requestID = 0;

    generateNext(): void {
        this.next = this.getNextAnim();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, globalMainIdleWaitingTime);
    }
    destroy(): void {
        super.destroy();
        clearTimeout(this.requestID);
    }
    getFrame(): string {
        return "shime11.png";
    }

    getNextAnim(): Ianimation {
        if (Math.random() > 0.5) {
            return new IdleNormal();
        }
        const animations = [
            new IdleSitsAndBored(),
            new IdleSitsAndLookUp(),
            new IdleSitsAndSing(),
            new IdleSitsAndSticksTongue(),
            new IdleSitsOnTchat(),
        ];
        return animations[Math.floor(Math.random() * animations.length)];
    }
}

export class IdleSitsAndBored extends SingleAnimationAbstract {
    name = "idle sits and bored";
    requestID = 0;

    init(mascot: Mascot) {
        super.init(mascot);
        this.mascot.canvas.translateOffset.y = 14;
        this.mascot.canvas.flushPosition();
    }
    destroy(): void {
        clearTimeout(this.requestID);
        this.mascot.canvas.translateOffset.y = 0;
        this.mascot.canvas.flushPosition();
    }
    generateNext(): void {
        this.next = new IdleSits();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, globalMainIdleWaitingTime);
    }
    getFrame(): string {
        return "shime30.png";
    }
}

export class IdleSitsAndLookUp extends SingleAnimationAbstract {
    name = "idle sits and look up";
    requestID = 0;

    destroy(): void {
        super.destroy();
        clearTimeout(this.requestID);
    }
    generateNext(): void {
        this.next = new IdleSits();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, globalMainIdleWaitingTime);
    }
    getFrame(): string {
        return "shime26.png";
    }
}

export class IdleSitsAndSing extends SingleAnimationAbstract {
    name = "idle sits and sing";
    requestID = 0;
    animation = new FramesManager("16 17 16 17 27 15", 1200);

    init(mascot: Mascot) {
        super.init(mascot);
        this.animation.init(mascot);
    }
    destroy(): void {
        super.destroy();
        this.animation.destroy();
        clearTimeout(this.requestID);
    }
    generateNext(): void {
        this.next = new IdleSits();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 8200);
    }
    getFrame(): string {
        return "shime15.png";
    }
}

export class IdleSitsAndSticksTongue extends SingleAnimationAbstract {
    name = "idle sits and sticks tongue out";
    requestID = 0;
    animation = new FramesManager("28 29 29 27", 1000);

    init(mascot: Mascot) {
        super.init(mascot);
        this.animation.init(mascot);
    }
    destroy(): void {
        super.destroy();
        this.animation.destroy();
        clearTimeout(this.requestID);
    }
    generateNext(): void {
        this.next = new IdleSits();
        this.requestID = window.setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 5000);
    }
    getFrame(): string {
        return "shime27.png";
    }
}
