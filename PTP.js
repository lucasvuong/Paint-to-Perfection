let targetGrid = [],
    playerGrid = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 4; i++) {
        targetGrid[i] = [];
        playerGrid[i] = [];
        for (let j = 0; j < 4; j++) {
            targetGrid[i][j] = floor(random(0, 5));
            playerGrid[i][j] = -1;
        }
        noStroke();
    }
}

function draw() {
    background(255);
    drawGrid(
        targetGrid,
        windowWidth / 2 - (windowHeight - 15) / 16,
        (windowHeight - 15) / 8 + 5,
        (windowHeight - 15) / 8,
        (windowHeight - 15) / 8
    );
    drawGrid(
        playerGrid,
        windowWidth / 2 - (windowHeight - 15) / 8,
        (windowHeight - ((windowHeight - 15) / 4 + 5)) / 2,
        (windowHeight - 15) / 4,
        (windowHeight - 15) / 4
    );
}

function drawGrid(grid, x, y, w, h) {
    push();
    colorMode(HSB);
    fill(0, 0, 0);
    rect(x - 1, y - 1, w + 2, h + 2);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > -1) {
                fill(getColorById(grid[i][j]), 100, 100);
            } else {
                fill(0, 0, 100);
            }
            rect(
                j * (w / grid.length) + x,
                i * (h / grid[i].length) + y,
                w / grid.length,
                h / grid[i].length
            );
        }
    }
    pop();
}


function getColorById(id) {
    switch (id) {
        case 3:
            return 120;
        case 4:
            return 240;
        case 5:
            return 270;
    }
    return id * 30;
}
