;(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key)
    if (saved ? saved !== 'false' : def) {
      document.documentElement.classList.add(cls)
    }
  }
  restore('sfsivv-docs-prefer-composition', 'prefer-composition')
  restore('sfsivv-docs-prefer-sfc', 'prefer-sfc', true)

  // window.__VUE_BANNER_ID__ = ''
  // restore(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'banner-dismissed')
})()
