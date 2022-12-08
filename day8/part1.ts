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

let visible = new Map<number, number>()

reader.on('close', () => {
  for (let x = 0; x < trees.length; x++) {
    y:
    for (let y = 0; y < trees[x].length; y++) {
      const height = trees[x][y]
      const coord = x * trees[x].length + y

      if (x === 0 || x === trees.length - 1 || y === 0 || y === trees.length - 1) {
        visible.set(coord, height)
        continue
      }

      let canSee = true
      for (let right = y + 1; right < trees[x].length; right++) {
        if (trees[x][right] >= height) {
          canSee = false
        }
      }

      if (canSee) {
        visible.set(coord, height)
        continue y
      }

      canSee = true
      for (let down = x + 1; down < trees.length; down++) {
        if (trees[down][y] >= height) {
          canSee = false
        }
      }

      if (canSee) {
        visible.set(coord, height)
        continue y
      }

      canSee = true
      for (let left = y - 1; left >= 0; left--) {
        if (trees[x][left] >= height) {
          canSee = false
        }
      }

      if (canSee) {
        visible.set(coord, height)
        continue y
      }

      canSee = true
      for (let up = x - 1; up >= 0; up--) {
        if (trees[up][y] >= height) {
          canSee = false
        }
      }

      if (canSee) {
        visible.set(coord, height)
        continue y
      }
    }
  }

  console.log('Visible', visible.size)

  console.log('Process took', Date.now() - start, 'ms')
})
