import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let characters = 0
let map = {}

reader.on('line', (line) => {
  for (const char of line) {
    characters++

    if (char in map) {
      for (const key of Object.keys(map)) {
        delete map[key]

        if (key === char) {
          break
        }
      }
    }

    map[char] = true

    if (Object.keys(map).length >= 4) {
      return
    }
  }
})

reader.on('close', () => {
  console.log('Characters processed', characters)

  console.log('Process took', Date.now() - start, 'ms')
})
