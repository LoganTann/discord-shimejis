import { Mascot } from "../mascot/Mascot";
import { DiscordWindow } from "./DiscordWindow";
import { Point, Rect, Rectangle } from "./shapeInterfaces";

export class Environment {
    mascot!: Mascot;
    screenRects!: Rectangle;
    canvasRect = { width: 0, height: 0 };

    resizeObserver!: ResizeObserver;
    init(mascot: Mascot) {
        this.mascot = mascot;
        this.onUpdate();
        this.resizeObserver = new ResizeObserver(this.onUpdate.bind(this));
        this.resizeObserver.observe(this.mascot.container);
        this.canvasRect = {
            width: this.mascot.canvas.canvas.width,
            height: this.mascot.canvas.canvas.height,
        };
    }
    destroy() {
        this.resizeObserver.disconnect();
    }

    onUpdate() {
        const oldRect = this.screenRects
            ? { ...this.screenRects }
            : new Rect(0, 0, 0, 0);
        const app = DiscordWindow.getInstance().getEnvElement();
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

    getCollisionStatus(position: Point) {
        const maxYpos = this.screenRects.bottom - this.canvasRect.height;
        const maxXpos = this.screenRects.right - this.canvasRect.width;
        const originOffsetX = this.canvasRect.width * 0.5;

        let status: CollisionStatus = CollisionStatus.None;
        let newPosition = { ...position };
        if (
            position.x - originOffsetX > maxXpos ||
            position.x + originOffsetX <= this.screenRects.left
        ) {
            status = CollisionStatus.Wall;
        } else if (position.y > maxYpos) {
            status = CollisionStatus.Floor;
        }
        return { status, newPosition };
    }
}
export enum CollisionStatus {
    None,
    Wall,
    Floor,
    Chat,
}
