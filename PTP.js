let targetGrid = [],
    playerGrid = [],
    playerGridWidth,
    playerGridHeight,
    playerGridX,
    playerGridY,
    playerCellWidth,
    playerCellHeight,
    position = "1st";

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
    playerGridX = windowWidth / 2 - (windowHeight - 15) / 8;
    playerGridY = (windowHeight - ((windowHeight - 15) / 4 + 5)) / 2;
    playerGridWidth = (windowHeight - 15) / 4;
    playerGridHeight = (windowHeight - 15) / 4;
    playerCellHeight = playerGridHeight / playerGrid.length;
    playerCellWidth = playerGridWidth / playerGrid[0].length;
    background(255);
    drawGrid(
        targetGrid,
        windowWidth / 2 - (windowHeight - 15) / 16,
        (windowHeight - 15) / 8 + 5,
        (windowHeight - 15) / 8,
        (windowHeight - 15) / 8
    );
    if (compare2DArrays(playerGrid, targetGrid)) {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(50);
        text(
            position,
            playerGridX + playerGridWidth / 2,
            playerGridY + playerCellHeight / 2
        );
    } else {
        drawGrid(
            playerGrid,
            playerGridX,
            playerGridY,
            playerGridWidth,
            playerGridHeight
        );
    }
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

function mousePressed() {
    for (let i = 0; i < playerGrid.length; i++) {
        for (let j = 0; j < playerGrid[i].length; j++) {
            let element = playerGrid[i][j];
            if (
                playerGridX + j * playerCellWidth <= mouseX &&
                playerGridY + i * playerCellHeight <= mouseY &&
                playerGridX + (j + 1) * playerCellHeight >= mouseX &&
                playerGridY + (i + 1) * playerCellWidth >= mouseY
            ) {
                playerGrid[i][j] = (playerGrid[i][j] + 1) % 6;
            }
        }
    }
}

function compare2DArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) {
            return false;
        }
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }
    return true;
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
