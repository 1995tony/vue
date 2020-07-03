// 實例化載入
import Vue from './instance/index'
// 初始化一些全局 API
import { initGlobalAPI } from './global-api/index'
// 判斷環境, 是否為 ssr (server-side-render): boolean
import { isServerRendering } from 'core/util/env'
// virtualDom 編譯成 renderContext 的方法
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// 為 ssr 環境時, 會去加載這個方法
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
