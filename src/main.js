import DefaultLayout from '~/layouts/Default.vue'
import 'spectre.css/docs/dist/docs.css'
import 'spectre.css/dist/spectre.css'
import 'spectre.css/dist/spectre-exp.css'
import 'spectre.css/dist/spectre-icons.css'
export default function (Vue) {
  Vue.component('Layout', DefaultLayout)
}
