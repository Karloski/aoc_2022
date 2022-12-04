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
  let pairs = [] as Array<Array<string>>

  for (const pair of line.split(',')) {
    pairs.push(pair.split('-'))
  }

  if (
    (parseInt(pairs[0][0]) >= parseInt(pairs[1][0]) && parseInt(pairs[0][1]) <= parseInt(pairs[1][1])) ||
    (parseInt(pairs[1][0]) >= parseInt(pairs[0][0]) && parseInt(pairs[1][1]) <= parseInt(pairs[0][1]))
  ) {
    sum++
  }
})

reader.on('close', () => {
  console.log('Sum', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
