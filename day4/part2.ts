import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let sum = 0

const isIn = (no: number, min: number, max: number) => {
  return no >= min && no <= max
}

const overlaps = (pair1: Array<number>, pair2: Array<number>) => {
  return isIn(pair1[0], pair2[0], pair2[1]) || isIn(pair1[1], pair2[0], pair2[1])
}

reader.on('line', (line) => {
  let pairs = [] as Array<Array<number>>

  for (const pair of line.split(',')) {
    pairs.push(pair.split('-').map(no => parseInt(no)))
  }

  if (
    overlaps(pairs[0], pairs[1]) ||
    overlaps(pairs[1], pairs[0])
  ) {
    sum++
  }
})

reader.on('close', () => {
  console.log('Sum', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
