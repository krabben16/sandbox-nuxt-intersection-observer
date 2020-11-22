import { Plugin } from '@nuxt/types'

const pageType = {
  root: 1,
  observer: 2,
  image: 3,
}

declare module '@nuxt/types' {
  interface Context {
    $pageType: typeof pageType
  }
}

const pageTypePlugin: Plugin = (context) => {
  context.$pageType = pageType
}

export default pageTypePlugin
