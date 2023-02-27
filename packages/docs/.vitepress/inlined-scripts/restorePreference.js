(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved ? saved !== 'false' : def) {
      document.documentElement.classList.add(cls);
    }
  };
  restore('sfsivv-docs-prefer-composition', 'prefer-composition');
  restore('sfsivv-docs-prefer-sfc', 'prefer-sfc', true);

  // window.__VUE_BANNER_ID__ = ''
  // restore(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'banner-dismissed')
})();
// 百度统计
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?536b4668b60b16a236243ee166868538';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();
