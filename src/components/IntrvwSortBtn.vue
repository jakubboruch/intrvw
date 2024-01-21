<script setup lang="ts">
import {computed} from 'vue';

const props = withDefaults(
    defineProps<{
      modelValue: number,
    }>(), {
      modelValue: 1,
    });

const emit = defineEmits<{
  e: 'update:modelValue', data: string
}>()

const sortIcon = computed(() => {
  switch(props.modelValue) {
    case 1: {
      return 'icon-sort-up';
    }
    case -1: {
      return 'icon-sort-down';
    }
    default: {
      return 'icon-sort';
    }
  }
})
const onSortChange = () => {
  let stopsSortingOrder = props.modelValue;
  switch(props.modelValue) {
    case 0: { stopsSortingOrder= 1; break; }
    case 1: { stopsSortingOrder = -1; break; }
    case -1: { stopsSortingOrder = 0; break; }
    default: { stopsSortingOrder = 0 }
  }
  emit('update:modelValue', stopsSortingOrder);
}

</script>
<template>
  <i class="intrvw-sort-btn" :class="sortIcon" @click="onSortChange"></i>
</template>
<style lang="scss" scoped>
@import '../assets/scss';
@import '../assets/scss/iconfonts';

.intrvw-sort-btn {
  font-size: $font-size-xs;
  padding: 5px;
  color: $color-grey-3;
}
</style>