import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let sum = 0
let lines = [] as Array<string>

reader.on('line', (line) => {
    lines.push(line)

    if (lines.length % 3 === 0) {
      const rucksacks = [
        {}, {}
      ]

      for (const char of lines[0]) {
        if (!(char in rucksacks[0])) {
          rucksacks[0][char] = true
        }
      }

      for (const char of lines[1]) {
        if (char in rucksacks[0]) {
          rucksacks[1][char] = true
        }
      }

      for (const char of lines[2]) {
        if (char in rucksacks[0] && char in rucksacks[1]) {
          let priority = char.toLowerCase().charCodeAt(0) - 96

          if (char.toLowerCase() !== char) {
            priority += 26
          }

          sum += priority

          break
        }
      }

      lines = []
    }
})

reader.on('close', () => {
  console.log('Sum of priorities', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
