const frames = [
    "1",
    "1 2 1 3",
    "11",
    "26",
    "26 11",
    "26 15 27 16 28 17 29 11",
    "30",
    "31",
    "31 32 31 33",
    "21",
    "20 20 21 21 21",
    "23",
    "25 25 23 24 24 24 23 25",
    "13",
    "14 14 12 13 13 13 12 14",
    "14 14 12 13 13 13 12 14",
    "36",
    "34 35 34 36",
    "37",
    "22",
    "4",
    "18 19",
    "19 18 20 20 19",
    "9 7 1 8 10",
    "5 6 5 6 1 5 6 5 6 5 6 5 6 1 5 6 5 6 5 6 5 6 5 6 5 6 5 6 5 6",
    "1 38 39 40 41",
    "9",
    "42 43 44 45 46",
];
const names = [];

document.addEventListener("DOMContentLoaded", () => {
    const toInsert = frames.map((framesListStr) => {
        const framesList = framesListStr
            .split(" ")
            .map((nb) => `./shime${nb}.png`);
        const container = document.createElement("div");
        container.classList.add("container");

        const animatedImage = document.createElement("img");
        animatedImage.classList.add("animated-image");
        animatedImage.src = framesList[0];
        animatedImage.dataset.i = 0;
        animatedImage.dataset.framesList = framesListStr;
        container.append(animatedImage);

        const elemsList = framesList.map((src) => {
            const elem = document.createElement("img");
            elem.src = src;
            return elem;
        });

        container.append(...elemsList);
        return container;
    });
    const app = document.getElementById("app");
    app.append(...toInsert);

    window.setInterval(() => {
        const animatedImages = document.querySelectorAll(".animated-image");
        animatedImages.forEach((animatedImage) => {
            const i = parseInt(animatedImage.dataset.i, 10);
            const framesList = animatedImage.dataset.framesList.split(" ");
            const key = framesList[i];
            animatedImage.src = `./shime${key}.png`;
            animatedImage.parentElement.dataset.comment = `${i}/${framesList.length}`;

            animatedImage.dataset.i = i + 1;
            if (i === framesList.length - 1) {
                animatedImage.dataset.i = 0;
            }
        });
    }, 600);
});
