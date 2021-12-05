const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(' -> ').map(x => x.split(',').map(x => parseInt(x))));

const lines = input.filter(x => {
    return x[0][0] == x[1][0] || x[0][1] == x[1][1]
});

const max = Math.max.apply(null, lines.map(x => [...x[0], ...x[1]]).join().split(',').map(x => parseInt(x))) + 1;
const grid = Array.from({ length: max }, () => (Array.from({ length: max }, () => 0)));

function arrayFromNumbers(start, end) {
    if (start > end) [start, end] = [end, start];
    return Array(end - start + 1).fill().map((_, i) => start + i);
}

lines.forEach(line => {
    if (line[0][0] == line[1][0]) { // same x
        arrayFromNumbers(line[0][1], line[1][1]).map(y => {
            grid[line[0][0]][y] += 1;
        });
    } else { //same y
        arrayFromNumbers(line[0][0], line[1][0]).map(x => {
            grid[x][line[0][1]] += 1;
        });
    }
});

console.log(grid.map(x => x.join()).join().split(',').map(x => parseInt(x)).filter(x => x >= 2).length);