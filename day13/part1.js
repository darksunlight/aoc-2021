const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n\n');
console.log(`opening ${filename}`);

let dots = input[0].split('\n');
const instructions = input[1].split('\n');

let grid = [];
for (let i = 0; i <= Math.max(...dots.map(x => x.split(',')[1])); i++) {
    grid.push(Array(Math.max(...dots.map(x => x.split(',')[0])) + 1).fill('.'));
}

dots.forEach(line => {
    const [x, y] = line.split(',');
    grid[y][x] = '#';
});

console.log(grid.map(x => x.join('')).join('\n'));
function foldHorizontal(y) {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[grid.length - 1 - i][j] == '#') grid[i][j] = '#';
        }
    }
    grid = grid.slice(0, y);
}

function foldVertical(x) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < x; j++) {
            if (grid[i][grid[i].length - 1 - j] == '#') grid[i][j] = '#';
        }
        grid[i] = grid[i].slice(0, x);
    }
}

const firstInstruction = instructions[0].split(' ')[2].split('=');
if (firstInstruction[0] == 'x') {
    foldVertical(firstInstruction[1]);
} else {
    foldHorizontal(firstInstruction[1]);
}
console.log('\n');
console.log([...grid.map(x => x.join('')).join('')].filter(x => x == '#').length);