import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

let stacks = [] as Array<Array<string>>

// 5 = number to move
// 12 from
// 17 to

reader.on('line', (line) => {
  if ((line[0] === '[' || line[0] === ' ') && Number.isNaN(parseInt(line[1]))) {
    const lineStacks = Math.ceil(line.length / 4)

    if (stacks.length < lineStacks) {
      console.log('Adding stacks', stacks.length, lineStacks)

      for (let i = stacks.length; i < lineStacks; i++) {
        stacks.push([])
      }
    }

    // 1 Starts at the first letter
    for (let i = 1; i < line.length; i+=4) {
      if (line[i] !== ' ') {
        stacks[Math.floor(i / 4)].unshift(line[i])
      }
    }
  }

  if (line[0] === 'm') {
    const numbers = line.match(/\d+/g).map(no => parseInt(no))

    console.log('Moving', numbers[0], 'stacks from', numbers[1], 'to', numbers[2])

    for (let i = 0; i < numbers[0]; i++) {
      stacks[numbers[2] - 1].push(stacks[numbers[1] - 1].pop())
    }
  }
})

reader.on('close', () => {
  console.log('Top stacks', stacks.reduce((carry, item) => carry += item[item.length - 1], ''))

  console.log('Process took', Date.now() - start, 'ms')
})
