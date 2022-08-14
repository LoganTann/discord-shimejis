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
        console.info("%c[shimejis]", "font-weight: bold", "Plugin started.");
        new Mascot().start();
    },
    stop() {
        console.info("%c[shimejis]", "font-weight: bold", "Plugin unloaded.");
    },
};

// DOM only

document.addEventListener("DOMContentLoaded", () => {
    Main.start();
});

export default Main;
