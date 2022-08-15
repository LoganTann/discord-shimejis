import { Mascot } from "../mascot/Mascot";
import { GrabbedBehavior } from "./GrabbedBehavior";
import { Ibehavior } from "./Ibehavior";

export enum IdleCausedBy {
    FallHard,
    FallSoft,
}
export enum IdleDirection {
    Left,
    Right,
}
export interface IdleBehaviorArguments {
    source?: IdleCausedBy;
    direction?: IdleDirection;
}

export class IdleBehavior implements Ibehavior {
    name = "idle";
    mascot!: Mascot;
    listener!: (e: PointerEvent) => void;

    constructor() {}

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.listener = this.handlePointerDown.bind(this);
        this.mascot.canvas.canvas.addEventListener(
            "pointerdown",
            this.listener
        );
    }
    destroy(): void {
        this.mascot.canvas.canvas.removeEventListener(
            "pointerdown",
            this.listener
        );
    }

    handlePointerDown(e: PointerEvent) {
        this.mascot.canvas.setFrame("shime01.png");
        this.mascot.setBehavior(
            new GrabbedBehavior({ x: e.clientX, y: e.clientY })
        );
    }
}
