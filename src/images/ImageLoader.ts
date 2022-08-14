const frames = [
    "shime01.png",
    "shime1.png",
    "shime2.png",
    "shime3.png",
    "shime4.png",
    "shime5.png",
    "shime6.png",
    "shime7.png",
    "shime8.png",
    "shime9.png",
    "shime10.png",
    "shime11.png",
    "shime12.png",
    "shime13.png",
    "shime14.png",
    "shime15.png",
    "shime16.png",
    "shime17.png",
    "shime18.png",
    "shime19.png",
    "shime20.png",
    "shime21.png",
    "shime22.png",
    "shime23.png",
    "shime24.png",
    "shime25.png",
    "shime26.png",
    "shime27.png",
    "shime28.png",
    "shime29.png",
    "shime30.png",
    "shime31.png",
    "shime32.png",
    "shime33.png",
    "shime34.png",
    "shime35.png",
    "shime36.png",
    "shime37.png",
    "shime38.png",
    "shime39.png",
    "shime40.png",
    "shime41.png",
    "shime42.png",
    "shime43.png",
    "shime44.png",
    "shime45.png",
    "shime46.png",
];

export class ImageLoader {
    image: Record<string, HTMLImageElement> = {};
    async load() {
        const promises = frames.map((frame) => {
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.src = `./img/${frame}`;
                this.image[frame] = image;
            });
        });
        await Promise.all(promises);
    }

    get(frame: string) {
        return this.image[frame];
    }
}
