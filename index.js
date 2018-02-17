import mixin from './mixin'

export { mixin }

export default Vue => {
  Vue.mixin(mixin)
}
