import { normalize } from 'path'
import glob from 'glob'

const CWD = process.cwd()

async function importTemplate(filePath: string) {
  const normalizedFilePath = normalize(`${CWD}/${filePath}`)

  const module = await import(normalizedFilePath)

  let template = module

  if (typeof module.default === 'function') {
    template = module.default
  } else {
    delete module.default
  }

  const fileNameWithExtension = filePath.split('/').pop()
  const fileNameWithoutExtension = fileNameWithExtension?.split('.').shift()

  return { 
    template,
    meta: {
      filePath,
      fileNameWithExtension,
      fileNameWithoutExtension,
    },
  }
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

export { importTemplate, findAllFilesThatMatch }
