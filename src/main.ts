/**
 * @name Discord-Shimejis
 * @author ShinProg
 * @description discord shimejis
 * @version 0.0.1
 */

import { Iplugin } from "./Iplugin";
import { Mascot } from "./mascot/Mascot";
import "./style.css";

const Main: Iplugin = {
    start() {
        console.log("start");
        new Mascot().start();
    },
    stop() {
        console.log("stop");
    },
};

// DOM only

document.addEventListener("DOMContentLoaded", () => {
    Main.start();
});

export default Main;
