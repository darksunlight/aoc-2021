const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n');
console.log(`opening ${filename}`);

const ops = {
    '(': [0, ')'],
    '[': [1, ']'],
    '{': [2, '}'],
    '<': [3, '>']
};

const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

let corrupted = [];

input.forEach(line => {
    let last = [];
    lineLoop:
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        // console.log(char)
        if (Object.keys(ops).includes(char)) last.push(char);
        else if (char != ops[last[last.length-1]][1]) {
            corrupted.push(char);
            break lineLoop;
        } else {
            last = last.slice(0, -1);
        }
    }
});

console.log(corrupted.reduce((p, c) => p += points[c], 0));