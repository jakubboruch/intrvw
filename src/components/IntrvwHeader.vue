<script setup lang="ts">
</script>
<template>
  <div class="intrvw-header">
    <div class="intrvw-header__preheader"><slot name="preheader"></slot></div>
    <h3 class="intrvw-header__title"><slot></slot></h3>
  </div>
</template>
<style lang="scss">
@import '../assets/scss';

.intrvw-header {
  &__title {
    color: $color-text-1;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    word-wrap: break-word;
    padding-top: 24px;
    padding-bottom: 8px;
    margin: 0;
  }
}
</style>