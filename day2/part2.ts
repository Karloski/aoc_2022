import { createReadStream } from 'fs'
import { createInterface } from 'node:readline'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reader = createInterface(createReadStream(__dirname+'/input.txt'))

interface PlayOptions {
  [key:string]: 'Rock' | 'Paper' | 'Scissors'
}

interface PlayOutcome {
  [key:string]: 'Win' | 'Draw' | 'Lose'
}

interface PlayScores {
  Rock: number
  Paper: number
  Scissors: number
}

const scores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
} as PlayScores

const opponent = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
} as PlayOptions

const player = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win'
} as PlayOutcome

let total = 0

reader.on('line', (line) => {
  let score = 0

  const chosen = {
    opponent: opponent[line[0]]
  }

  if (player[line[2]] === 'Win') {
    score = (scores[chosen.opponent] + 1 > 3 ? 1 : scores[chosen.opponent] + 1) + 6
  } else if (player[line[2]] == 'Draw') {
    score = scores[chosen.opponent] + 3
  } else {
    score = scores[chosen.opponent] - 1 < 1 ? 3 : scores[chosen.opponent] - 1
  }

  total += score

  console.log(`Score for ${line}`, score, total)
})

reader.on('close', () => {
  console.log('Total score', total)
})