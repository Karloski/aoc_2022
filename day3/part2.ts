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

  const compartments = [
    line.substring(0, line.length / 2),
    line.substring(line.length / 2)
  ]

  for (const char of compartments[0]) {
    if (compartments[1].includes(char)) {
      let priority = char.toLowerCase().charCodeAt(0) - 96

      if (char.toLowerCase() !== char) {
        priority += 26
      }

      sum += priority

      // console.log(`Duplicate ${duplicate} found in both compartments with priority`, priority)

      break
    }
  }
})

reader.on('close', () => {
  console.log('Sum of priorities', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
