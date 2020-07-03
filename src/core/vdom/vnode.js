/* @flow */

export default class VNode {
  // 當前節點的標籤名
  tag: string | void;
  // 當前節點的對應對象, 包含具體的一些數據信息, 是一個 VNodeData class
  data: VNodeData | void;
  // 當前節點的子節點, 為陣列
  children: ?Array<VNode>;
  // 當前節點的文本
  text: string | void;
  // 當前虛擬節點對應的真實 dom 節點
  elm: Node | void;
  // 當前節點的名字空間
  ns: string | void;
  // 編譯作用域
  context: Component | void; // rendered in this component's scope
  // 節點 key 屬性, 被當作節點的標誌, 用以優化
  key: string | number | void;
  // 組件的 option 選項
  componentOptions: VNodeComponentOptions | void;
  // 當前節點對應的組件實例
  componentInstance: Component | void; // component instance
  // 當前節點的復父節點
  parent: VNode | void; // component placeholder node

  // strictly internal
  // 為 HTML 文本或是普通文本
  raw: boolean; // contains raw HTML? (server only)
  // 靜態節點標誌
  isStatic: boolean; // hoisted static node
  // 是否作為根節點插入
  isRootInsert: boolean; // necessary for enter transition check
  // 是否為註釋節點
  isComment: boolean; // empty comment placeholder?
  // 是否為 Clone 節點
  isCloned: boolean; // is a cloned node?
  // 是否有 v-once 指令
  isOnce: boolean; // is a v-once node?
  // 異步組件的工廠方法
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}

export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.isCloned = true
  return cloned
}
