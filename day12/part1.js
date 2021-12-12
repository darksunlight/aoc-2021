const filename = './input.txt';
const fs = require('fs');
let input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('-'));
console.log(`opening ${filename}`);

const connections = {};

let paths = [];

input.forEach(line => {
    if (!connections[line[0]]) connections[line[0]] = [];
    if (!connections[line[1]]) connections[line[1]] = [];
    connections[line[0]].push(line[1]);
    connections[line[1]].push(line[0]);
});

/**
 * 
 * @param {string} start 
 * @param {string[]} path
 */
function explore(start, path) {
    for (let i = 0; i < connections[start].length; i++) {
        const newPath = Array.from(path);
        const connection = connections[start][i];
        if (newPath[newPath.length - 1] !== start) console.log("BIG PROBLEM", start, newPath)
        if (connection == 'start' || (path.filter(x => x == connection).length > 0 && connection == connection.toLowerCase())) {
            continue;
        }
        if (connections[connection].length < 2 && start == start.toLowerCase()) {
            continue;
        }
        newPath.push(connection);
        // console.log(start, '->', connection)
        if (connection == 'end') {
            paths.push(newPath);
            continue;
        }
        explore(connection, newPath);
    }
}

explore('start', ['start']);

console.log(paths.length);