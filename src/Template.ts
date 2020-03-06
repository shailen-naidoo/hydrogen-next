import { Page, Layout } from './File'

interface LayoutAndPage {
  page: Page;
  layout: Layout | undefined;
}

function findMatchingLayoutTemplate(layoutTemplates: Layout[], pageTemplate: Page): Layout | undefined {
  return layoutTemplates.find((layoutTemplate) => {
    return layoutTemplate.meta.fileNameWithoutExtension === pageTemplate.meta.layoutToUse
  })
}

function mergeLayoutAndPageTemplates(layoutTemplates: Layout[], pageTemplates: Page[]): LayoutAndPage[] {
  return pageTemplates.map((pageTemplate) => ({
    page: pageTemplate,
    layout: findMatchingLayoutTemplate(layoutTemplates, pageTemplate)
  }))
}

export {
  mergeLayoutAndPageTemplates,
}
