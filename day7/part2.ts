import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

const start = Date.now()

class Node<K, V> {
  public key: K
  public value: V
  public prev: Node<K, V>

  constructor (key: K, value: V) {
    this.key = key
    this.value = value
  }
}

let THRESHOLD = 30000000 - (70000000 - 42143088)
let dir: Node<string, number> = new Node('/', 0)
let smallestDir: Node<string, number> = new Node('/', Infinity)

reader.on('line', (line) => {
  console.log('Reading input', line)

  console.log('Current directory', dir.key)

  if (/\$ cd/.test(line)) {
    const name = /\$ cd (.*)/.exec(line)[1]

    console.log('Changing directory to', name)

    if (name === '..') {
      dir.prev.value += dir.value

      dir = dir.prev
    } else if (name !== '/') {
      const current = new Node(/\$ cd ([a-z.]+)/.exec(line)[1], 0)
      current.prev = dir

      dir = current
    }
  }

  if (/^\d/.test(line)) {
    dir.value += parseInt(/^(\d+)/.exec(line)[1])
  }

  if (dir.value >= THRESHOLD) {
    console.log(`Directory ${dir.key} has a size greater than the threshold`, dir.value, THRESHOLD)

    if (smallestDir.value > dir.value) {
      smallestDir = dir
    }
  }
})

reader.on('close', () => {
  // while (dir.prev) {
  //   dir.prev.value += dir.value

  //   dir = dir.prev
  // }

  // console.log('Root has a size of', dir.value)

  console.log(`Smallest directory with size greater than or equal to ${THRESHOLD}`, smallestDir.key, smallestDir.value)

  console.log('Process took', Date.now() - start, 'ms')
})
