import { Point } from "../commonTypes/environment";
import { ImageLoader } from "../images/ImageLoader";

export class Canvas {
    canvas: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    images!: ImageLoader;
    position: Point = { x: 0, y: 0 };

    static async newInstance(images: ImageLoader) {
        const instance = new Canvas(128, 128);
        instance.images = images;
        await instance.images.load();
        instance.initContext();
        return instance;
    }

    private constructor(width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.setAttribute("class", "ene-shimeji");
        this.updatePosition();
    }
    private initContext() {
        const app = document.getElementById("app");
        if (!app) {
            throw new Error("app element not found");
        }
        app.appendChild(this.canvas);
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("canvas context not found");
        }
        this.ctx = ctx;
    }

    setFrame(frame: string) {
        const img = this.images.get(frame);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
    }
    updatePosition() {
        this.canvas.dataset.left = String(this.position.x);
        this.canvas.dataset.top = String(this.position.y);
    }
}
