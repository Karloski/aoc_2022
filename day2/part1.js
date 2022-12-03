import { createReadStream } from 'fs';
import { createInterface } from 'node:readline';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reader = createInterface(createReadStream(__dirname + '/input.txt'));
const scores = {
    Rock: 1,
    Paper: 2,
    Scissors: 3
};
const opponent = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors'
};
const player = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
};
let total = 0;
reader.on('line', (line) => {
    const chosen = {
        opponent: opponent[line[0]],
        player: player[line[2]]
    };
    total += scores[chosen.player];
    if (scores[chosen.player] - 1 === scores[chosen.opponent] || scores[chosen.player] === 1 && scores[chosen.opponent] === 3) {
        total += 6;
    }
    else if (scores[chosen.player] === scores[chosen.opponent]) {
        total += 3;
    }
});
reader.on('close', () => {
    console.log('Total score', total);
});
