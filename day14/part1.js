const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n\n');
console.log(`opening ${filename}`);

let polymer = input[0];
const pairs = input[1].split('\n').map(x => x.split(' -> '));

const all = new Set();
pairs.forEach(pair => {
    all.add(pair[0][0]);
    all.add(pair[0][1]);
});

function insertPair() {
    let newPolymer = polymer;
    for (let i = 0; i < polymer.length - 1; i++) {
        // console.log(pairs.filter(x => x[0] == polymer[i] + polymer[i+1])[0][1])
        newPolymer = newPolymer.substring(0, 2*i+1) + pairs.filter(x => x[0] == polymer[i] + polymer[i+1])[0][1] + newPolymer.substring(2*i+1);
    }
    polymer = newPolymer;
}

for (let i = 0; i < 10; i++) {
    insertPair();
}

const lengths = [];

all.forEach(v => {
    lengths.push(polymer.split('').filter(x => x == v).length);
});
console.log(Math.max(...lengths) - Math.min(...lengths));