const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split(' | '));
console.log(`opening ${filename}`);

let occurence = 0;
input.map(x => x[1].split(' ')).map(x => occurence += x.filter(y => [2, 3, 4, 7].includes(y.length)).length);
console.log(occurence);