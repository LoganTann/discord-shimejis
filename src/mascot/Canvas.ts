import { Point } from "../environment/shapeInterfaces";
import { ImageLoader } from "../images/ImageLoader";

export class Canvas {
    canvas: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    images!: ImageLoader;
    position: Point = { x: 0, y: 0 };
    translateOffset: Point = { x: 0, y: 0 };

    public reversed: boolean = false;

    static async newInstance(images: ImageLoader, app: HTMLElement) {
        const instance = new Canvas(128, 128);
        instance.images = images;
        console.info(
            "%c[shimejis]",
            "font-weight: bold",
            "Downloading images..."
        );
        await instance.images.load();
        console.info("%c[shimejis]", "font-weight: bold", "images loaded...");
        app.appendChild(instance.canvas);
        instance.initContext();
        return instance;
    }

    private constructor(width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.setAttribute("class", "ene-shimeji");
        this.canvas.style.position = "absolute";
        this.canvas.style.zIndex = "101";
        this.updatePosition();
    }
    private initContext() {
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
    updatePosition(x = 0, y = 0) {
        this.position.x = x;
        this.position.y = y;
        this.flushPosition();
    }
    flushPosition() {
        const { x, y } = this.position;
        let transformStyle = `translate(${x + this.translateOffset.x}px, ${
            y + this.translateOffset.y
        }px)`;
        if (this.reversed) {
            transformStyle += " scaleX(-1)";
        }
        this.canvas.style.transform = transformStyle;
    }
}
