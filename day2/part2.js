const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let horizontal = 0;
let depth = 0;
let aim = 0;

input.forEach(line => {
    const op = line.split(' ')[0];
    const amount = parseInt(line.split(' ')[1]);
    switch (op) {
        case "forward":
            horizontal += amount;
            depth += aim * amount;
            break;
        case "down":
            aim += amount;
            break;
        case "up":
            aim -= amount;
            break;
    }
});

console.log(horizontal*depth);