const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(' -> ').map(x => x.split(',').map(x => parseInt(x))));

const lines = input;

const max = Math.max.apply(null, lines.map(x => [...x[0], ...x[1]]).join().split(',').map(x => parseInt(x))) + 1;
const grid = Array.from({ length: max }, () => (Array.from({ length: max }, () => 0)));

function arrayFromNumbers(start, end) {
    let larger = false;
    if (start > end) {
        [start, end] = [end, start];
        larger = true;
    }
    const array = Array(end - start + 1).fill().map((_, i) => start + i);
    if (larger) array.reverse();
    return array;
}

function lineFromCoords(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;
    let x = arrayFromNumbers(startX, endX);
    let y = arrayFromNumbers(startY, endY);
    if (x.length < y.length) x = Array(y.length).fill(x[0]);
    if (y.length < x.length) y = Array(x.length).fill(y[0]);
    x = x.map((e, i) => ([e, y[i]]));
    return x;
}

lines.forEach(line => {
    lineFromCoords(line[0], line[1]).forEach(coord => {
        grid[coord[0]][coord[1]]++;
    })
});

// console.log(grid.map(x => x.join()));
console.log(grid.map(x => x.join()).join().split(',').map(x => parseInt(x)).filter(x => x >= 2).length);