import { createReadStream } from 'fs';
import { createInterface } from 'node:readline';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reader = createInterface(createReadStream(__dirname + '/input.txt'));
let max = 0;
let subtotal = 0;
reader.on('line', (line) => {
    if (subtotal === 0) {
        console.log('New Elf calorie count starting at', line);
    }
    if (line === '') {
        console.log('Current max', max);
        console.log('Food carried', subtotal);
        if (subtotal > max) {
            max = subtotal;
        }
        subtotal = 0;
    }
    else {
        subtotal += parseInt(line);
    }
});
reader.on('close', () => {
    console.log('Highest calorie count', max);
});
