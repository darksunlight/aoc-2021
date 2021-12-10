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
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};

let corrupted = [];

input.forEach((line, index) => {
    let last = [];
    lineLoop:
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (Object.keys(ops).includes(char)) last.push(char);
        else if (char != ops[last[last.length-1]][1]) {
            corrupted.push(index);
            break lineLoop;
        } else {
            last = last.slice(0, -1);
        }
    }
});

const lines = input.filter((_, i) => !corrupted.includes(i));
console.log(lines.length);

const autocomplete = [];

lines.forEach(line => {
    let last = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (Object.keys(ops).includes(char)) last.push(char);
        else {
            last = last.slice(0, -1);
        }
    }
    autocomplete.push(last.map(x => ops[x][1]).reverse());
});

const scores = autocomplete.map(x => x.reduce((p, c) => p = 5*p + points[c], 0)).sort((a, b) => a - b);
console.log(scores[Math.floor(scores.length / 2)]);