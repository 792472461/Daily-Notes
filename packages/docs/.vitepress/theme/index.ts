import { h } from 'vue'
import { VPTheme } from '@vue/theme'
import NavBar from "./components/NavBar.vue";
import './styles/index.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {
      'navbar-title': () => h(NavBar),
    })
  },
})

