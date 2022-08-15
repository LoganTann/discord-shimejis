import { Mascot } from "../mascot/Mascot";
import { SingleAnimationAbstract } from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";

export class IdleFish extends SingleAnimationAbstract {
    name = "idle fish";
    requestID = 0;

    init(mascot: Mascot) {
        super.init(mascot);
        mascot.canvas.reversed = this.isRight;
        mascot.canvas.flushPosition();
    }
    destroy(): void {
        clearTimeout(this.requestID);
        this.mascot.canvas.reversed = false;
        this.mascot.canvas.flushPosition();
    }
    generateNext(): void {
        this.next = new IdleNormal();
        this.requestID = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 2000);
    }
    getFrame(): string {
        return "shime20.png";
    }
}
