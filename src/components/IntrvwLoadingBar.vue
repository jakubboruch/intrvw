<template>
  <div class="intrvw-loading-bar"></div>
</template>

<style lang="scss">
@import '../assets/scss';
.intrvw-loading-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: $space-2;
  background: repeating-linear-gradient(to right, $color-primary 0%, $color-grey-1 50%, $color-primary 100%);
  width: 100%;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 2s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
@keyframes gradient {
  0%   { background-position: 0 0; }
  100% { background-position: -200% 0; }
}
</style>