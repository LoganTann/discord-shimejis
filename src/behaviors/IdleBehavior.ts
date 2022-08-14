import { Mascot } from "../mascot/Mascot";
import { GrabbedBehavior } from "./GrabbedBehavior";
import { Ibehavior } from "./Ibehavior";

export class IdleBehavior implements Ibehavior {
    name = "idle";
    mascot!: Mascot;

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.mascot.canvas.canvas.addEventListener(
            "pointerdown",
            this.handlePointerDown.bind(this)
        );
    }
    destroy(): void {
        this.mascot.canvas.canvas.removeEventListener(
            "pointerdown",
            this.handlePointerDown.bind(this)
        );
    }

    handlePointerDown(e: PointerEvent) {
        this.mascot.canvas.setFrame("shime01.png");
        this.mascot.setBehavior(new GrabbedBehavior());
    }
}
