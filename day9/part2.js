const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('').map(x => +x));
console.log(`opening ${filename}`);

let basins = 0;
const sizes = [];

input.forEach(line => {
    line.forEach((height, j) => {
        if (height == 9) line[j] = ' ';
        else line[j] = '█'
    });
});

console.log(input.map(x => x.join('')).join('\n'), '\n');

function depthFirstSearch(i, j, size) {
    if (input[i][j] == '█') {
        ++size;
        input[i][j] = ' ';
        if (i > 0) size = depthFirstSearch(i - 1, j, size);
        if (j > 0) size = depthFirstSearch(i, j - 1, size);
        if (i < input.length - 1) size = depthFirstSearch(i + 1, j, size);
        if (j < input[i].length - 1) size = depthFirstSearch(i, j + 1, size);
    }
    return size;
}
input.forEach((line, i) => {
    line.forEach((height, j) => {
        if (height == '█') {
            ++basins;
            sizes.push(depthFirstSearch(i, j, 0));
        }
    });
});

console.log(sizes.sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p *= c, 1));
// console.log(input.map(x => x.join('')).join('\n'));