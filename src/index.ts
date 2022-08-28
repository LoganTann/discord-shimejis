/**
 * @name Discord-Shimejis
 * @author ShinProg
 * @description discord shimejis
 * @version 0.0.1
 */

import { Iplugin } from "./Iplugin";
import { Mascot } from "./mascot/Mascot";
import "./style.css";

export default class Main implements Iplugin {
    mascotInstance?: Mascot;

    start() {
        console.info("%c[shimejis]", "font-weight: bold", "Starting plugin...");
        this.mascotInstance = new Mascot();
        this.mascotInstance.start();
    }
    stop() {
        this.mascotInstance?.stop();
        console.info("%c[shimejis]", "font-weight: bold", "Plugin unloaded.");
    }
}
