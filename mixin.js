const stash = {}

export default {
  data() {
    if (!this.$options.stash) return {}
    if (!(this.$vnode.tag in stash)) {
      stash[this.$vnode.tag] = this.$options.stash
    }
    return stash[this.$vnode.tag]
  },
  beforeDestroy() {}
}
