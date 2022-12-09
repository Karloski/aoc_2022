// Approximate answer: (((cols.length * 2 + (rows.length * 2)) - 4) + (((rows.length - 2) * 2) + ((cols.length - 2) * 2))
import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

class Coord {
  public x: number
  public y: number

  public uniquePositions: Array<Array<number>> = []

  constructor (x: number, y: number) {
    this.x = x
    this.y = y

    this.uniquePositions.push([this.x, this.y])
  }

  moveTo (x: number, y: number) {
    this.x = x
    this.y = y

    if (!this.uniquePositions.find((pos) => this.x === pos[0] && this.y === pos[1])) {
      this.uniquePositions.push([this.x, this.y])
    }
  }

  surrounds (coord: Coord): boolean {
    if (this.x !== coord.x && this.x + 1 !== coord.x && this.x - 1 !== coord.x) {
      return false
    }

    if (this.y !== coord.y && this.y + 1 !== coord.y && this.y - 1 !== coord.y) {
      return false
    }

    return true
  }

  equals (coord: Coord): boolean {
    return this.x === coord.x && coord.y === coord.y
  }


}

const head = new Coord(0, 0)
const tail = new Coord(0, 0)

reader.on('line', (line) => {
  let commands = line.split(' ')

  const direction = commands[0]
  const steps = parseInt(commands[1])

  switch (direction) {
    case 'R':
      for (let i = 0; i < steps; i++) {
        head.moveTo(head.x + 1, head.y)

        // console.log('Head is now', head)

        if (!tail.surrounds(head)) {
          // console.log('Tail', tail, 'does not surround the head', head)

          tail.moveTo(head.x - 1, head.y)
        }
      }
      break
    case 'U':
      for (let i = 0; i < steps; i++) {
        head.moveTo(head.x, head.y + 1)

        // console.log('Head is now', head)

        if (!tail.surrounds(head)) {
          // console.log('Tail', tail, 'does not surround the head', head)

          tail.moveTo(head.x, head.y - 1)
        }
      }
      break
    case 'L':
      for (let i = 0; i < steps; i++) {
        head.moveTo(head.x - 1, head.y)

        // console.log('Head is now', head)

        if (!tail.surrounds(head)) {
          // console.log('Tail', tail, 'does not surround the head', head)

          tail.moveTo(head.x + 1, head.y)
        }
      }
      break
    case 'D':
      for (let i = 0; i < steps; i++) {
        head.moveTo(head.x, head.y - 1)

        // console.log('Head is now', head)

        if (!tail.surrounds(head)) {
          // console.log('Tail', tail, 'does not surround the head', head)

          tail.moveTo(head.x, head.y + 1)
        }
      }
      break
  }
})

reader.on('close', () => {
  console.log('Unique positions for the tail', tail.uniquePositions.length)

  console.log('Process took', Date.now() - start, 'ms')
})
