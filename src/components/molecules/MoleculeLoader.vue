<template>
  <div>
    <span class="skeleton-loader" />
  </div>
</template>

<style lang="scss" scoped>
.skeleton-loader {
  width: 100%;
  height: 15px;
  display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 100px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0, 0 0;
  }
}
</style>
