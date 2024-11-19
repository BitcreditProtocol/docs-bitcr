import comp from "/Users/macintosh/Documents/GitHub/docs-bitcr/docs/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":null,\"actions\":[{\"text\":\"E-bill\",\"link\":\"/e-bill/\",\"type\":\"primary\"},{\"text\":\"Wildcat Mint\",\"link\":\"/wildcat-mint/\",\"type\":\"primary\"}],\"footer\":\"MIT Licensed | Copyright © 2024 Bitcredit\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"README.md\"}")
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
