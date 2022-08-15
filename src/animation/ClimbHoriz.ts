import { ThrownBehavior } from "../behaviors/ThrownBehavior";
import { Mascot } from "../mascot/Mascot";
import { FramesManager, SingleAnimationAbstract } from "./Animation_Defs";
import { ThrownFlyNormal } from "./ThrownFly";

export class IdleClimbHoriz extends SingleAnimationAbstract {
    name = "idle climb horiz";
    requestID = 0;

    init(mascot: Mascot): void {
        super.init(mascot);
        if (this.isRight) {
            this.mascot.canvas.reversed = true;
        }
    }
    destroy(): void {
        clearTimeout(this.requestID);
    }
    generateNext(): void {
        if (Math.random() > 0.5) {
            this.next = new IdleClimbMoveUp(this.isRight);
        } else {
            this.next = this;
        }
        this.requestID = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 1000);
    }
    getFrame(): string {
        return "shime13.png";
    }
}

export class IdleClimbMoveUp extends IdleClimbHoriz {
    name = "idle climb horiz move up";

    animation = new FramesManager("14 13 12 12", 500);

    init(mascot: Mascot): void {
        super.init(mascot);
        this.animation.init(mascot);
    }
    destroy(): void {
        super.destroy();
        this.animation.destroy();
    }

    generateNext(): void {
        if (Math.random() > 0.5) {
            this.next = new IdleClimbMoveUp(this.isRight);
        } else {
            this.next = this;
        }
        this.requestID = setTimeout(() => {
            if (Math.random() > 0.7) {
                this.mascot.setAnimation(new ThrownFlyNormal(this.isRight));
                this.mascot.setBehavior(
                    new ThrownBehavior({ x: this.isRight ? -20 : 20, y: -20 })
                );
                return;
            }
            this.mascot.setAnimation(this.next!);
        }, 2500);
    }
}
