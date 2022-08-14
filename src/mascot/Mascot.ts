import { ImageLoader } from "../images/ImageLoader";
import { Iplugin } from "../Iplugin";
import { Canvas } from "./Canvas";

export class Mascot implements Iplugin {
    canvas!: Canvas;
    async start() {
        this.canvas = await Canvas.newInstance(new ImageLoader());
        this.canvas.setFrame("shime1.png");
    }
    stop() {}
}
