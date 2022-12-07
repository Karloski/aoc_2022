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

let THRESHOLD = 100000
let sum = 0
let dir: Node<string, number> = new Node('/', 0)

reader.on('line', (line) => {
  console.log('Reading input', line)

  console.log('Current directory', dir.key)

  if (/\$ cd/.test(line)) {
    const name = /\$ cd (.*)/.exec(line)[1]

    console.log('Changing directory to', name)

    if (name === '/') {
      dir = new Node<string, number>('/', 0)
    } else if (name === '..') {
      dir.prev.value += dir.value

      if (dir && dir.value > 0 && dir.value <= THRESHOLD) {
        console.log(`Directory ${dir.key} had a size lower than the threshold`, dir.value, THRESHOLD)

        sum += dir.value
      }

      dir = dir.prev
    } else {
      const current = new Node(/\$ cd ([a-z.]+)/.exec(line)[1], 0)
      current.prev = dir

      dir = current
    }
  }

  if (/^\d/.test(line)) {
    dir.value += parseInt(/^(\d+)/.exec(line)[1])
  }
})

reader.on('close', () => {
  console.log('Sum', sum)

  console.log('Process took', Date.now() - start, 'ms')
})
