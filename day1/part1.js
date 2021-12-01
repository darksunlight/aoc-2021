const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => parseInt(x));
let counter = 0;
for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) counter++;
}
console.log(counter);