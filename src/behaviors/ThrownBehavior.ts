import { Point } from "../environment/shapeInterfaces";
import { Mascot } from "../mascot/Mascot";
import { GrabbedBehavior } from "./GrabbedBehavior";
import { Ibehavior } from "./Ibehavior";

export class ThrownBehavior implements Ibehavior {
    name = "thrown";
    mascot!: Mascot;

    constructor(private delta: Point) {
        console.log("Will throw as delta", delta);
    }

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.mascot.canvas.canvas.addEventListener(
            "pointerdown",
            this.handlePointerDown.bind(this)
        );
        this.mascot.canvas.setFrame("shime22.png");
    }
    destroy(): void {
        this.mascot.canvas.canvas.removeEventListener(
            "pointerdown",
            this.handlePointerDown.bind(this)
        );
    }

    handlePointerDown(e: PointerEvent) {
        this.mascot.canvas.setFrame("shime01.png");
        this.mascot.setBehavior(
            new GrabbedBehavior({ x: e.clientX, y: e.clientY })
        );
    }
}
