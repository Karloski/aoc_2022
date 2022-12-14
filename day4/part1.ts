import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let sum = 0

const contains = (pair1: Array<number>, pair2: Array<number>) => {
  return pair1[0] >= pair2[0] && pair1[1] <= pair2[1]
}

reader.on('line', (line) => {
  let pairs = [] as Array<Array<number>>

  for (const pair of line.split(',')) {
    pairs.push(pair.split('-').map(no => parseInt(no)))
  }

  if (
    contains(pairs[0], pairs[1]) ||
    contains(pairs[1], pairs[0])
  ) {
    sum++
  }
})

reader.on('close', () => {
  console.log('Sum', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
