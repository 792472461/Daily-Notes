/// <reference types="vitepress/client" />
/// <reference types="vue/macros-global" />

declare module '@vue/theme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}

