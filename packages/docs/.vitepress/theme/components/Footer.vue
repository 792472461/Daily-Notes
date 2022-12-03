<template>
  <div class="VPFooter">
    <p class="copyright">
      Copyright © 2021-{{currentYear}} SongFengshuai
    </p>
    <div class="divider">|</div>
    <a class="link" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021036489号-1</a>
  </div>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    const currentYear = new Date().getFullYear();
    return {
      currentYear,
    };
  }
};
</script>

<style scoped>
.VPFooter {
  border-top: 1px solid var(--vt-c-bg-soft);
  padding: 23px 24px 24px;
  background-color: var(--vt-c-bg-soft);
  transition: border-top 0.5s, background-color 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
}

.dark .VPFooter {
  border-top: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}

.copyright {
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.divider {
  margin: 0 4px;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.link {
  display: block;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-text-2);
}
</style>