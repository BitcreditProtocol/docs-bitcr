import comp from "/Users/macintosh/Documents/GitHub/docs-bitcr/vuepress-starter/docs/.vuepress/.temp/pages/E-bill/e-bill.html.vue"
const data = JSON.parse("{\"path\":\"/E-bill/e-bill.html\",\"title\":\"E-bill\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"E-bill/e-bill.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
