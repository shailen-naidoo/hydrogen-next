import { normalize } from 'path'
import glob from 'glob'

const CWD = process.cwd()

async function importScript(filePath: string) {
  const normalizedFilePath = normalize(`${CWD}/${filePath}`)

  const module = await import(normalizedFilePath)

  let template = module

  if (typeof module.default === 'function') {
    template = module.default
  } else {
    delete module.default
  }

  return template
}

async function findAllFilesThatMatch(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => glob(pattern, (err, matches) => {
    if (err) {
      reject(err)
    } else {
      resolve(matches)
    }
  }))
}

export { importScript, findAllFilesThatMatch }
