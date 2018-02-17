import EventsBus from 'nanoevents'

const bus = new EventsBus()
const components = []

const pick = keys => obj =>
  keys.reduce((res, key) => ({ ...res, [key]: obj[key] }), {})

const save = comp => {
  localStorage.setItem(
    `stash-${comp.$options.name}`,
    JSON.stringify(pick(Object.keys(comp.$options.stash))(comp))
  )
}

export default {
  data() {
    if (!this.$options.stash) return {}
    components.push(this)
    const ls = localStorage.getItem(`stash-${this.$options.name}`)
    const res = ls && ls !== '{}' ? JSON.parse(ls) : this.$options.stash
    return { ...res }
  },
  created() {
    this._stashWatchers = Object.keys(this.$options.stash).map(k =>
      this.$watch(k, val => bus.emit(`stash:${this.$options.name}`, k, val))
    )
    this._stashListener = bus.on(`stash:${this.$options.name}`, (k, val) => {
      this[k] = val
    })
  },
  beforeDestroy() {
    this._stashWatchers.forEach(unwatch => unwatch())
    this._stashListener()
    save(this)
  }
}
