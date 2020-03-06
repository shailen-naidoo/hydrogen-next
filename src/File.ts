import { importTemplate, findAllFilesThatMatch } from './helpers'

interface PageTemplate {
  layout: string;
  page: () => string;
  data: () => object;
  head: () => object[];
}

interface Meta {
  filePath: string;
  fileNameWithExtension: string | undefined;
  fileNameWithoutExtension: string | undefined;
  layoutToUse: string | null;
  templateType: string;
}

interface Page {
  template: PageTemplate;
  meta: Meta;
}

interface Layout {
  template: () => string;
  meta: Meta;
}

async function getTemplatesFrom(folder: string = '') {
  const pattern = `${folder}/**/*.js`

  const templates = await findAllFilesThatMatch(pattern)

  return Promise.all(templates.map(importTemplate))
}

async function getPageTemplates(): Promise<Page[]> {
  const templates = await getTemplatesFrom('pages')

  return templates.map((template) => ({
    ...template,
    meta: {
      ...template.meta,
      templateType: 'page',
    }
  }))
}

async function getLayoutTemplates(): Promise<Layout[]> {
  const templates = await getTemplatesFrom('layouts')

  return templates.map((template) => ({
    ...template,
    meta: {
      ...template.meta,
      templateType: 'layout',
    }
  }))
}

function getLayoutAndPageTemplates() {
  return Promise.all([getLayoutTemplates(), getPageTemplates()])
}

export {
  getLayoutAndPageTemplates,
  Page,
  Layout,
}
