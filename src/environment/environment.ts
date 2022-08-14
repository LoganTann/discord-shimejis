import { Mascot } from "../mascot/Mascot";

export class Environment {
    mascot!: Mascot;
    screenRects!: DOMRect;

    init(mascot: Mascot) {
        this.mascot = mascot;
        this.onUpdate();
    }
    destroy() {}

    onUpdate() {
        this.screenRects = this.mascot.container.getBoundingClientRect();
        console.info(
            "%c[Environment]",
            "font-weight: bold;",
            "updated screen rects",
            this.screenRects
        );
    }
}
