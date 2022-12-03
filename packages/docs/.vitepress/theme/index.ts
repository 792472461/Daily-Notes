import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import NavBar from "./components/NavBar.vue";

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {
      'navbar-title': () => h(NavBar),
    })
  },
  enhanceApp({ app }: { app: App }) {}
})
