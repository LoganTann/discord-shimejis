import { Ianimation } from "../animation/Ianimation";
import { Ibehavior } from "../behaviors/Ibehavior";
import { ThrownBehavior } from "../behaviors/ThrownBehavior";
import { Environment } from "../environment/environment";
import { ImageLoader } from "../images/ImageLoader";
import { Iplugin } from "../Iplugin";
import { Canvas } from "./Canvas";

export class Mascot implements Iplugin {
    canvas!: Canvas;
    container!: HTMLElement;
    animation?: Ianimation;
    behavior?: Ibehavior;
    environment: Environment = new Environment();

    async start() {
        this.initContainer();
        this.environment.init(this);
        this.canvas = await Canvas.newInstance(
            new ImageLoader(),
            this.container
        );
        this.initMascotPosition();
    }
    stop() {}

    initContainer() {
        const app = document.getElementById("app");
        if (!app) {
            throw new Error("app element not found");
        }
        this.container = app;
    }
    initMascotPosition() {
        this.canvas.position.x =
            this.environment.screenRects.width * 0.5 -
            this.canvas.canvas.width * 0.5;
        this.flushPosition();
        this.setBehavior(new ThrownBehavior({ x: 0, y: 0 }));
    }

    setAnimation(newAnim: Ianimation) {
        if (this.animation) {
            this.animation.destroy();
        }
        this.animation = newAnim;
        this.animation.init(this);
    }

    setBehavior(newBehavior: Ibehavior) {
        if (this.behavior?.name === newBehavior.name) {
            return;
        }
        if (this.behavior) {
            this.behavior.destroy();
        }
        this.behavior = newBehavior;
        this.behavior.init(this);
        this.canvas.canvas.dataset.behavior = this.behavior.name;
    }

    /**
     * Calls canvas.flushPosition but normalize the values
     * @returns false if the value had to be changed; true otherwise
     */
    flushPosition() {
        const { top, left, right, bottom } = this.environment.screenRects;
        const intialPos = { ...this.canvas.position };
        if (this.canvas.position.x < left) {
            this.canvas.position.x = left;
        } else if (this.canvas.position.x + this.canvas.canvas.width > right) {
            this.canvas.position.x = right - this.canvas.canvas.width;
        }
        if (this.canvas.position.y < top) {
            this.canvas.position.y = top;
        } else if (
            this.canvas.position.y + this.canvas.canvas.height >
            bottom
        ) {
            this.canvas.position.y = bottom - this.canvas.canvas.height;
        }
        this.canvas.flushPosition();
        return (
            intialPos.x === this.canvas.position.x &&
            intialPos.y === this.canvas.position.y
        );
    }
}
