<script setup lang="ts">

withDefaults(
    defineProps<{
      type: 'success' | 'error' | 'info',
    }>(), {
      type: 'success',
    });

</script>
<template>
  <div class="intrvw-toast" :class="`intrvw-toast--${type}`">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '../assets/scss';
.intrvw-toast {
  position: absolute;
  right: $space-7;
  top: $space-4;
  height: auto;
  width: 200px;
  background: red;
  padding: $space-4;
  border-radius: $border-radius-primary;
  &--success {
    background: $color-success;
    color: $color-white;
  }
  &--error {
    background: $color-error;
    color: $color-white;
  }
  &--info {
    background: $color-primary;
    color: $color-white;
  }
}
</style>