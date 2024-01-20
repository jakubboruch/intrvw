<script setup lang="ts">
import { ref } from 'vue';
import IntrvwHeader from "@/components/IntrvwHeader.vue";

const props = withDefaults(
    defineProps<{
      modelValue: string | number | undefined;
      title: string;
      items: string[] | number[] | undefined;
    }>(), {
      modelValue: '',
      title: '',
      items: () => ([])
    });

const emit = defineEmits<{
  e: 'update:modelValue', data: string
}>()

const onClickItem = (item: string) => {
  emit('update:modelValue', item)
}

</script>
<template>
  <section class="intervw-data-inline">
    <intrvw-header>{{ title }}</intrvw-header>
    <div class="intervw-data-inline__content">
      <button @click="onClickItem(item)" class="intervw-data-inline__btn" :class="{'intervw-data-inline__btn--active': props.modelValue === item }" v-for="(item, i) in items" :key="i">{{ item }}</button>
    </div>
  </section>
</template>
<style lang="scss">
@import '../assets/scss';
.intervw-data-inline {
  display: flex;
  padding: 0 24px;
  background-color: $color-white;
  border-radius: 4px;
  flex-direction: column;
  &__content {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 24px 0;
  }
  &__btn {
    border-radius: $border-radius-primary;
    padding: 8px 16px;
    background-color: $color-primary;
    color: white;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    word-wrap: break-word;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: $color-primary-hover;
    }
    &--active, &--active:hover {
      background-color: $color-primary-active;
    }
  }
}
</style>