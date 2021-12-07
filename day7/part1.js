const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split(',').map(x => +x);
console.log(`opening ${filename}`);

let costs = [];

for (let i = 0; i <= Math.max.apply(null, input); i++) {
    costs.push(input.map(x => Math.abs(x - i)).reduce((p, c) => p + c, 0));
}

console.log(Math.min.apply(null, costs));