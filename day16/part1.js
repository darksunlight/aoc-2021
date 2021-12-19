// i dont even know what this is
const filename = './test.txt';
const fs = require('fs');
const binary = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
}
const input = fs.readFileSync(filename, 'utf-8').split('').map(x => binary[x]).join('');
console.log(`opening ${filename}`);

function btd(i) {
    return eval('0b' + i); // yes
}

let globalV = 0;

/**
 * 
 * @param {string} it 
 */
function parsePacket(it) {
    if (!it) return;
    console.log('got', it);
    const v = btd(it.substring(0, 3));
    globalV += v;
    const t = btd(it.substring(3, 6));
    if (t === 4) {
        console.log('type 4');
        let p = it.substring(6);
        let c = false;
        const pl = [];
        while (p.length > 4) {
            pl.push(p.substring(1, 5));
            p = p.substring(5);
            c = p[0] === '0';
        }
        if (c && p.length > 4) {
            return parsePacket(p);
        }
        const o = btd(pl.join(''));
        return [v, t, it.length, o];
    } else {
        console.log('type op');
        const lt = it.charAt(6);
        if (lt === '0') {
            console.log('length type 0');
            const l = btd(it.substring(7, 22));
            let got = 0;
            let pk;
            while (got < l) {
                pk = parsePacket(it.substring(22));
                console.log('packet:', pk);
                got += pk[2];
            }
            return [v, t];
        } else if (lt === '1') {
            console.log('length type 1');
            const l = btd(it.substring(7, 18));
            let got = 0;
            let pk;
            while (got < l) {
                pk = parsePacket(it.substring(22));
                console.log('packet:', pk);
                while (pk && pk[1] == 4) {
                    pk = parsePacket(it.substring(22 + pk[2]));
                }
                got += 1;
            }
            return parsePacket(it.substring(18));
        }
    }
}
// console.log(input);
console.log(parsePacket(input));
console.log(globalV);