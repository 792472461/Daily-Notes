<script setup>
import Footer from "./Footer.vue";
</script>
<template>
  <section id="hero">
    <h1 class="tagline">
      <span class="accent">前端进阶记录</span>
    </h1>
    <p class="description">
      宋宋的加油站，记录进步的点点滴滴
    </p>
    <p class="actions">
      <a class="get-started" href="/interview/html">
        开始加油
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>

    </p>
  </section>

  <div class="divider"></div>

  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>精选面试题</h2>
      <p>
        记录常见面试题，看到八股文再也不怕了
      </p>
    </div>
    <div class="vt-box">
      <h2>源码解析</h2>
      <p>
        包含Vue2、Vue3、React等源码解析,更深入的理解框架
      </p>
    </div>
    <div class="vt-box">
      <h2>工程化</h2>
      <p>
        性能优化、自动化部署、持续集成、各种前端构建工具等
      </p>
    </div>
  </section>

  <Footer />

</template>

<style scoped>
#hero {
  padding: 96px 32px 30px;
  max-width: 960px;
  margin: 0 auto;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions .get-started {
  font-size: 16px;
  display: inline-block;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
  position: relative;
  font-weight: 600;
  background-color: var(--vt-c-green);
  color: #fff;
  padding: 8px 18px;
}

.dark .actions .get-started {
  color: var(--vt-c-indigo);
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover {
  background-color: var(--vt-c-green-light);
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.divider {
  height: 1px;
  background-color: var(--vt-c-divider-light);;
  margin: 64px 0;
}


#highlights {
  max-width: 960px;
  margin: 0 auto 64px;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}


#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 64px 32px;
  }

  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }

  #highlights h3 {
    margin-bottom: 0.6em;
  }

  #highlights .vt-box {
    padding: 20px 36px;
  }

  .actions a {
    margin: 0.5em 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
