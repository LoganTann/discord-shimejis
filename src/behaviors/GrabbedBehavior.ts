import { Point } from "../environment/shapeInterfaces";
import { Mascot } from "../mascot/Mascot";
import { Ibehavior } from "./Ibehavior";

export class GrabbedBehavior implements Ibehavior {
    name = "grabbed";
    mascot!: Mascot;
    clickOffset: Point = { x: -1, y: -1 };
    moves = new MovesAvgBuffer();

    debugElement = document.createElement("div");

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.mascot.container.addEventListener(
            "pointermove",
            this.handlePointerMove.bind(this)
        );

        // velocity debug
        this.debugElement.style.background = "black";
        this.debugElement.style.width = "10px";
        this.debugElement.style.height = "10px";
        document
            .querySelector(".messageWrapper")
            ?.appendChild(this.debugElement);
    }
    destroy(): void {
        this.mascot.container.removeEventListener(
            "pointerdown",
            this.handlePointerMove.bind(this)
        );

        document.querySelector(".messageWrapper>div")?.remove();
    }

    handlePointerMove(e: PointerEvent) {
        if (e.pressure < 0.5) {
            return; // not clicking
        }
        if (this.clickOffset.x === -1) {
            this.clickOffset.x = e.clientX - this.mascot.canvas.position.x;
            this.clickOffset.y = e.clientY - this.mascot.canvas.position.y;
        }
        this.mascot.canvas.position.x = e.clientX - this.clickOffset.x;
        this.mascot.canvas.position.y = e.clientY - this.clickOffset.y;
        this.mascot.flushPosition();
    }
}

/**
 * Utility class that stores the 10 last moves's difference and contains a method to calculate the average.
 */
class MovesAvgBuffer {
    max: number = 10;
    buffer: Point[] = [];

    i: number = 1;
    filledAll = false;
    calledOnce = false;

    add(newEntry: Point) {
        if (!this.calledOnce) {
            this.buffer[0] = newEntry;
            this.calledOnce = true;
            return;
        }
        const previous = this.getPrevious();
        this.buffer[this.i] = {
            x: previous.x - newEntry.x,
            y: previous.y - newEntry.y,
        };
        this.i++;
        if (this.i >= this.max) {
            this.i = 0;
            this.filledAll = true;
        }
    }

    private getPrevious() {
        if (this.i === 0) {
            return this.buffer[this.max - 1];
        }
        return this.buffer[this.i - 1];
    }

    constructor() {
        this.buffer = Array(this.max).fill({ x: 0, y: 0 });
    }
    average(): Point {
        if (!this.filledAll) {
            return { x: 0, y: 0 };
        }
        const result = this.buffer.reduce(
            (acc, curr) => {
                return {
                    x: acc.x + curr.x,
                    y: acc.y + curr.y,
                };
            },
            { x: 0, y: 0 }
        );
        return {
            x: result.x / this.max,
            y: result.y / this.max,
        };
    }
}
