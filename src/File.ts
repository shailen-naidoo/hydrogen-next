import { importTemplate, findAllFilesThatMatch } from './helpers'

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

  return Promise.all(templates.map(importTemplate))
}

async function getPageTemplates(): Promise<{ template: PageTemplate }[]> {
  const templates = await getTemplatesFrom('pages')

  return templates.map((template) => ({
    ...template,
    meta: {
      ...template.meta,
      templateType: 'page',
    }
  }))
}

async function getLayoutTemplates(): Promise<{ template: LayoutTemplate }[]> {
  const templates = await getTemplatesFrom('layouts')

  return templates.map((template) => ({
    ...template,
    meta: {
      ...template.meta,
      templateType: 'layout',
    }
  }))
}

getLayoutTemplates().then(console.log)
getPageTemplates().then(console.log)

export {
  getLayoutTemplates,
  getPageTemplates,
}
