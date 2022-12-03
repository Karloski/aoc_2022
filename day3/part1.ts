import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let sum = 0

reader.on('line', (line) => {
  // console.log('Checking compartments', line)

  outer:
  for (let i = 0; i < line.length / 2; i++) {
    for (let j = line.length / 2; j < line.length; j++) {
      if (line[j] === line[i]) {
        let priority = line[j].toLowerCase().charCodeAt(0) - 96

        if (line[j].toLowerCase() !== line[j]) {
          priority += 26
        }

        sum += priority

        // console.log(`Duplicate ${duplicate} found in both compartments with priority`, priority)

        break outer
      }
    }
  }
})

reader.on('close', () => {
  console.log('Sum of priorities', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
