import { Mascot } from "../mascot/Mascot";
import { Rect, Rectangle } from "./shapeInterfaces";

export class Environment {
    mascot!: Mascot;
    screenRects!: Rectangle;

    resizeObserver!: ResizeObserver;
    init(mascot: Mascot) {
        this.mascot = mascot;
        this.onUpdate();
        this.resizeObserver = new ResizeObserver(this.onUpdate.bind(this));
        this.resizeObserver.observe(this.mascot.container);
    }
    destroy() {
        this.resizeObserver.disconnect();
    }

    onUpdate() {
        const oldRect = this.screenRects
            ? { ...this.screenRects }
            : new Rect(0, 0, 0, 0);
        const app = this.mascot.container;
        this.screenRects = Rect.fromElement(app);
        if (
            this.screenRects.width < oldRect.width ||
            this.screenRects.height < oldRect.height
        ) {
            this.mascot.flushPosition();
        }
        console.info(
            "%c[shimejis - Environment]",
            "font-weight: bold;",
            "updated screen rects",
            this.screenRects
        );
    }
}
