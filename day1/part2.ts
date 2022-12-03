import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

let top = [
  0, 0, 0
]

let subtotal = 0

reader.on('line', (line) => {
  if (line === '') {
    // If the current total is greater than the lowest
    if (subtotal > top[2]) {
      const idx = top.findIndex((v) => subtotal > v)

      top.splice(idx, 0, subtotal)
      top.pop()
    }

    subtotal = 0
  } else {
    subtotal += parseInt(line)
  }
})

reader.on('close', () => {
  console.log('Top three Elves', top)

  console.log('Top three total calorie count', top.reduce((item, carry) => carry += item, 0))
})