import { GrabbedFast, GrabbedSlow } from "../animation/Grabbed";
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
        this.mascot.canvas.reversed = false;
        this.clickOffset = {
            x: this.lastPosition.x - this.mascot.canvas.position.x,
            y: this.lastPosition.y - this.mascot.canvas.position.y,
        };
    }
    destroy(): void {
        this.mascot.container.removeEventListener("pointermove", this.listener);
    }

    handlePointerMove(e: PointerEvent) {
        const delta = {
            x: e.clientX - this.lastPosition.x,
            y: e.clientY - this.lastPosition.y,
        };
        if (e.pressure < 0.5) {
            this.makeThrown(e, delta);
            return;
        }
        this.lastPosition = { x: e.clientX, y: e.clientY };
        this.useGrabbedAnimation(delta);
        this.mascot.canvas.position.x = e.clientX - this.clickOffset.x;
        this.mascot.canvas.position.y = e.clientY - this.clickOffset.y;
        this.mascot.flushPosition();
    }

    useGrabbedAnimation(delta: Point) {
        const isRight = delta.x < 0;
        const dxAbs = Math.abs(delta.x);
        if (dxAbs > 5) {
            this.mascot.setAnimation(new GrabbedFast(isRight));
        } else if (dxAbs > 3) {
            this.mascot.setAnimation(new GrabbedSlow(isRight));
        }
    }

    alreadyChangedBehavior = false;
    makeThrown(e: PointerEvent, delta: Point) {
        // the probability of the two if statements to be true is very low but let's be safe
        if (this.alreadyChangedBehavior) {
            return;
        }
        this.alreadyChangedBehavior = true;
        if (this.lastPosition.x === 0 && this.lastPosition.y === 0) {
            this.lastPosition.x = e.clientX;
            this.lastPosition.y = e.clientY;
        }
        this.mascot.setBehavior(new ThrownBehavior(delta));
    }
}
