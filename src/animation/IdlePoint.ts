import { SingleAnimationAbstract } from "./Animation_Defs";
import { IdleNormal } from "./IdleNormal";

export class IdlePoint extends SingleAnimationAbstract {
    name = "idle point";
    requestID = 0;

    generateNext(): void {
        this.next = new IdleNormal();
        this.requestID = setTimeout(() => {
            this.mascot.setAnimation(this.next!);
        }, 1500);
    }
    getFrame(): string {
        return "shime37.png";
    }
}
