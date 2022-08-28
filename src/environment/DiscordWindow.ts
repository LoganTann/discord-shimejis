export class DiscordWindow {
    /** if false, means this is a fake window */
    isDiscord = false;

    static instance: DiscordWindow | null = null;

    static getInstance(): DiscordWindow {
        if (!DiscordWindow.instance) {
            DiscordWindow.instance = new DiscordWindow();
        }
        return DiscordWindow.instance;
    }

    private constructor() {
        if (document.location.href.includes("discord")) {
            this.isDiscord = true;
        }
    }

    getApp(): HTMLElement {
        let element;
        if (this.isDiscord) {
            element = document.querySelector("body>div") as HTMLElement;
        } else {
            element = document.getElementById("app");
        }
        if (!element) {
            throw new Error("app element not found");
        }
        return element;
    }

    getEnvElement(): HTMLElement {
        let element;
        if (this.isDiscord) {
            const firstNav = document.querySelector("nav");
            if (!firstNav) {
                throw new Error("Servers list not found");
            }
            element = firstNav.nextElementSibling as HTMLElement;
            console.log(element);
        } else {
            element = document.getElementById("app");
        }
        if (!element) {
            throw new Error("env element not found");
        }
        return element;
    }

    attachEasterEgg(callback: () => void) {
        if (!this.isDiscord) {
            (window as any).poisson = callback;
        }
    }

    detachEasterEgg() {
        if ((window as any).poisson) {
            delete (window as any).poisson;
        }
    }
}
