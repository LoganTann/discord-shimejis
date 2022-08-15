import { Mascot } from "../mascot/Mascot";
import { FramesManager, SingleAnimationAbstract } from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";

export class IdleSmug extends SingleAnimationAbstract {
    name = "idle smug";

    animation = new FramesManager("39 40", 500);
    requestID = 0;

    init(mascot: Mascot): void {
        super.init(mascot);
        this.animation.init(mascot);
    }

    destroy() {
        super.destroy();
        this.animation.destroy();
    }
    generateNext(): void {
        this.next = new IdleNormal();
        this.requestID = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 1500);
    }
    getFrame(): string {
        return "shime38.png";
    }
}
