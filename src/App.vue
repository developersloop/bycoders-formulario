<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
}
</style>
