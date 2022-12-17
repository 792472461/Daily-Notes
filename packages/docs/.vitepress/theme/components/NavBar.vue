<template>
  <img src="/logo.png" alt="logo" class="logo" width="24" height="24" />
  <span class="text">加油站</span>
</template>

<script lang="ts">
export default {
  name: "NavBar"
};
</script>

<style scoped>
.logo {
  position: relative;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}

</style>