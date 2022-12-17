/// <reference types="vitepress/client" />
/// <reference types="vue/macros-global" />

declare module '@vue/theme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}


declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}