let size = 16;
let isRainbowMode = false;
let isEraserMode = false;
let color = "#333333";
let isDrawing = false;

function initializeGrid(size) {
    const grid = document.querySelector("#grid");
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.addEventListener("mouseover", changeColor);
        cell.addEventListener("mousedown", () => {isDrawing = true});
        cell.addEventListener("mouseup", () => {isDrawing = false});
        cell.addEventListener("touchstart", (e) => {
            isDrawing = true;
            e.preventDefault();
            changeColor(e);
        });
        cell.addEventListener("touchmove", (e) => {
            e.preventDefault();
            changeColor(e);
        });
        cell.addEventListener("touchend", () => {isDrawing = false});
        grid.appendChild(cell);
    }
}

function changeColor(e) {
    if (!isDrawing) {
        return;
    }
    let target;
    const grid = document.querySelector("#grid");
    if (e.type === "touchmove") {
        let touch = e.touches[0];
        target = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
        target = e.target;
    }
    if (target.parentElement !== grid) {
        return;
    }
    if (isEraserMode) {
        target.style.backgroundColor = "#ffffff";
    } else if (isRainbowMode) {
        target.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    } else {
        target.style.backgroundColor = color;
    }
}

function clearGrid() {
    const grid = document.querySelector("#grid");
    const cells = grid.querySelectorAll("div");
    cells.forEach((cell) => cell.remove());
}

function resizeGrid(newSize) {
    clearGrid();
    initializeGrid(newSize);
}

function updateSizeDisplay(size) {
    const sizeDisplay = document.querySelector("#sizeValue");
    sizeDisplay.textContent = `${size} x ${size}`;
}

document.querySelector("#colorPicker").addEventListener("change", (e) => {
    color = e.target.value;
});

document.querySelector("#colorBtn").addEventListener("click", () => {
    isRainbowMode = false;
    isEraserMode = false;
});

document.querySelector("#rainbowBtn").addEventListener("click", () => {
    isRainbowMode = true;
    isEraserMode = false;
});

document.querySelector("#eraserBtn").addEventListener("click", () => {
    isEraserMode = true;
    isRainbowMode = false;
});

document.querySelector("#clearBtn").addEventListener("click", () => {
    clearGrid();
    initializeGrid(size);
});

document.querySelector("#sizeSlider").addEventListener("input", (e) => {
    size = e.target.value;
    resizeGrid(size);
    updateSizeDisplay(size);
});

initializeGrid(size);
updateSizeDisplay(size);
