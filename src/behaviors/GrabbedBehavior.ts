import { Point } from "../environment/shapeInterfaces";
import { Mascot } from "../mascot/Mascot";
import { Ibehavior } from "./Ibehavior";
import { ThrownBehavior } from "./ThrownBehavior";

export class GrabbedBehavior implements Ibehavior {
    name = "grabbed";
    mascot!: Mascot;
    clickOffset!: Point;

    lastPosition: Point;
    constructor(lastPosition: Point) {
        this.lastPosition = lastPosition;
    }

    listener!: (e: PointerEvent) => void;

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.listener = this.handlePointerMove.bind(this);
        this.mascot.container.addEventListener("pointermove", this.listener);
        this.clickOffset = {
            x: this.lastPosition.x - this.mascot.canvas.position.x,
            y: this.lastPosition.y - this.mascot.canvas.position.y,
        };
    }
    destroy(): void {
        this.mascot.container.removeEventListener("pointermove", this.listener);
    }

    handlePointerMove(e: PointerEvent) {
        if (e.pressure < 0.5) {
            this.makeThrown(e);
        } else {
            this.lastPosition = { x: e.clientX, y: e.clientY };
            this.mascot.canvas.position.x = e.clientX - this.clickOffset.x;
            this.mascot.canvas.position.y = e.clientY - this.clickOffset.y;
            this.mascot.flushPosition();
        }
    }

    alreadyChangedBehavior = false;
    makeThrown(e: PointerEvent) {
        // the probability of the two if statements to be true is very low but let's be safe
        if (this.alreadyChangedBehavior) {
            return;
        }
        this.alreadyChangedBehavior = true;
        if (this.lastPosition.x === 0 && this.lastPosition.y === 0) {
            this.lastPosition.x = e.clientX;
            this.lastPosition.y = e.clientY;
        }

        const delta = {
            x: e.clientX - this.lastPosition.x,
            y: e.clientY - this.lastPosition.y,
        };
        this.mascot.setBehavior(new ThrownBehavior(delta));
    }
}
