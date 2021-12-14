const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n\n');
console.log(`opening ${filename}`);

let polymer = input[0];
const pairs = input[1].split('\n').map(x => x.split(' -> '));
const mapping = new Map();

const all = new Set();
/**
 * @type {Map<string, number>}
 */
let amount = new Map();

/**
 * Maps individual letters to their occurences
 */
const lengths = new Map();

pairs.forEach(pair => {
    all.add(pair[0][0]);
    all.add(pair[0][1]);
    amount.set(pair[0], 0);
    mapping.set(pair[0], pair[1]);
});
all.forEach(letter => {
    lengths.set(letter, polymer.split('').filter(x => x == letter).length);
});

for (let i = 0; i < polymer.length - 1; i++) {
    const k = polymer.substring(i, i+2);
    amount.set(k, amount.get(k) + 1);
}
// console.log(amount)
function insertPair() {
    const newAmount = new Map();
    pairs.forEach(pair => {
        newAmount.set(pair[0], 0);
    });
    for (const [k, v] of amount.entries()) {
        newAmount.set(k[0] + mapping.get(k), newAmount.get(k[0] + mapping.get(k)) + v);
        newAmount.set(mapping.get(k) + k[1], newAmount.get(mapping.get(k) + k[1]) + v);
        lengths.set(mapping.get(k), lengths.get(mapping.get(k)) + v);
    }
    amount = newAmount;
}

for (let i = 0; i < 40; i++) {
    insertPair();
}

console.log([...amount.entries()]);
const lengthValues = [...lengths.values()];
console.log(Math.max(...lengthValues) - Math.min(...lengthValues));