<template>
  <div class="intrvw-header">
    <h3 class="intrvw-header__title"><slot></slot></h3>
  </div>
</template>
<style lang="scss">
@import '../assets/scss';

.intrvw-header {
  &__title {
    color: $color-text-1;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    line-height: $line-height-md;
    word-wrap: break-word;
    padding-top: $space-6;
    padding-bottom: $space-2;
    margin: 0;
  }
}
</style>