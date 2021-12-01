const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => parseInt(x));
let counter = 0;
for (let i = 3; i < input.length; i++) {
    if (input[i] > input[i-3]) counter++;
}
console.log(counter);