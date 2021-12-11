const filename = './input.txt';
const fs = require('fs');
let input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('').map(x => +x));
console.log(`opening ${filename}`);

let flashes = 0;

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < input.length; j++) {
        input[j] = input[j].map(x => x += 1);
    }
    const newLevels = Array.from(input);
    while (newLevels.flat().some(x => x > 9)) {
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < input[j].length; k++) {
                if (input[j][k] > 9) {
                    ++flashes;
                    newLevels[j][k] = -99;
                    // if (i < 2) console.log(j, k, input[j][k])
                    if (j > 0) {
                        if (k > 0) ++newLevels[j-1][k-1];
                        if (k < input[j-1].length - 1) ++newLevels[j-1][k+1];
                        ++newLevels[j-1][k];
                    }
                    if (k > 0) ++newLevels[j][k-1];
                    if (k < input[j].length - 1) ++newLevels[j][k+1];
                    if (j < input.length - 1) {
                        if (k > 0) ++newLevels[j+1][k-1];
                        if (k < input[j+1].length - 1) ++newLevels[j+1][k+1];
                        ++newLevels[j+1][k];
                    }
                }
            }
        }
    }
    /* if (i < 2) {
        console.log('input', input);
        console.log('newLevels\n' + newLevels.map(x => x.map(y => (y < 0) ? 0 : y )).map(x => x.join(' ')).join('\n'));
    } */
    input = newLevels.map(x => x.map(y => (y < 0) ? 0 : y ));
}
console.log(flashes);