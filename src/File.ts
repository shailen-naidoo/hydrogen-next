import { importScript, findAllFilesThatMatch } from './helpers'

interface PageTemplate {
  layout: string;
  page: () => string;
  data: () => object;
  head: () => object[];
}

type LayoutTemplate = () => string;

async function getTemplatesFrom(folder: string = '') {
  const pattern = `${folder}/**/*.js`

  const templates = await findAllFilesThatMatch(pattern)

  return Promise.all(templates.map(importScript))
}

async function getPageTemplates(): Promise<PageTemplate[]> {
  const templates = await getTemplatesFrom('pages')

  return templates.map((template) => ({
    ...template
  }))
}

async function getLayoutTemplates(): Promise<LayoutTemplate[]> {
  return getTemplatesFrom('layouts')
}

getLayoutTemplates().then(console.log)
getPageTemplates().then(console.log)

export {
  getLayoutTemplates,
  getPageTemplates,
}
