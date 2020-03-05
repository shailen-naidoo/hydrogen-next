import { normalize } from 'path'

const CWD = process.cwd()

async function importScript(filePath: string) {
  const normalizedFilePath = normalize(`${CWD}/${filePath}`)

  const module = await import(normalizedFilePath)

  delete module.default

  return module
}

export { importScript }
