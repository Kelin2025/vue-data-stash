const components = {}

const pick = keys => obj =>
  keys.reduce((res, key) => ({ ...res, [key]: obj[key] }), {})

const stashName = comp => `stash:${comp.$options.name}`

const pushComponent = comp => {
  const name = comp.$options.name
  if (!components[name]) components[name] = [comp]
  else components[name].push(comp)
  comp._stashWatchers = Object.keys(comp.$options.stash).map(k =>
    comp.$watch(k, (val, oldVal) => update(name, k, val), {
      deep: true
    })
  )
}

const update = (componentName, k, val) => {
  components[componentName].forEach(c => {
    c[k] = val
  })
}

const saveStash = comp => {
  localStorage.setItem(
    stashName(comp),
    JSON.stringify(pick(Object.keys(comp.$options.stash))(comp))
  )
  comp._stashWatchers.forEach(unwatch => unwatch())
  const idx = components[comp.$options.name].indexOf(comp)
  if (idx > -1) {
    components[comp.$options.name].splice(idx, 1)
  }
}

export default {
  data() {
    if (!this.$options.stash) return {}
    if (typeof this.$options.stash === 'function') {
      this.$options.stash = this.$options.stash()
    }
    const ls = localStorage.getItem(stashName(this))
    const res = ls && ls !== '{}' ? JSON.parse(ls) : this.$options.stash
    return { ...res }
  },
  created() {
    if (!this.$options.stash) return
    pushComponent(this)
  },
  beforeDestroy() {
    if (!this.$options.stash) return
    saveStash(this)
  }
}

window.addEventListener('unload', e => {
  ;[].concat(...Object.values(components)).forEach(saveStash)
  e.preventDefault()
  return false
})
