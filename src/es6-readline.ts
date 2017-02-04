import * as readline from 'readline'

let rl: readline.ReadLine | null = null

export function open(): readline.ReadLine {
  if (rl !== null) {
    throw new Error('You need to close readline first')
  }
  rl = readline.createInterface(process.stdin, process.stdout)
  return rl
}

export function question(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (rl === null) {
      reject('rl needs to be opened')
    } else {
      rl.question(message, answer => resolve(answer))
    }
  })
}

export function close(): void {
  if (rl == null) {
    throw new Error('You need to open readline first')
  }
  rl.close()
  rl = null
}
