// Approximate answer: (((cols.length * 2 + (rows.length * 2)) - 4) + (((rows.length - 2) * 2) + ((cols.length - 2) * 2))
import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

const trees = [] as Array<Array<number>>

let column = 0

reader.on('line', (line) => {
  trees.push([])

  for (const char of line) {
    trees[column].push(parseInt(char))
  }

  column++
})

let bestScenicScore = 0

reader.on('close', () => {
  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees[x].length; y++) {
      const height = trees[x][y]
      let scores = {
        right: 0,
        down: 0,
        left: 0,
        up: 0
      }

      for (let right = y + 1; right < trees[x].length; right++) {
        scores.right++

        if (trees[x][right] >= height) {
          break
        }
      }

      for (let down = x + 1; down < trees.length; down++) {
        scores.down++

        if (trees[down][y] >= height) {
          break
        }
      }

      for (let left = y - 1; left >= 0; left--) {
        scores.left++

        if (trees[x][left] >= height) {
          break
        }
      }

      for (let up = x - 1; up >= 0; up--) {
        scores.up++

        if (trees[up][y] >= height) {
          break
        }
      }

      const total = Object.values(scores).reduce((carry, item) => carry *= item, 1)

      if (total > bestScenicScore) {
        bestScenicScore = total
      }
    }
  }

  console.log('Best scenic score', bestScenicScore)

  console.log('Process took', Date.now() - start, 'ms')
})
