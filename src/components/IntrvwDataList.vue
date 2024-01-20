<script setup lang="ts">
import { computed } from 'vue';
import IntrvwHeader from "@/components/IntrvwHeader.vue";

const props = withDefaults(
    defineProps<{
      modelValue?: string;
      items: string[]
      selectable?: boolean,
      placeholder?: string,
    }>(), {
      modelValue: undefined,
      items: () => ([{}]),
      selectable: false,
      placeholder: ''
    });
const emit = defineEmits<{
  e: 'update:modelValue', data: string
}>()

const onClickItem = (item: string) => {
  if (!props.selectable) {
    return;
  }
  emit('update:modelValue', item)
}
</script>
<template>
  <section class="intervw-data-list" :class="{'intervw-data-list--placeholder': placeholder}">
    <div class="intervw-data-list__placeholder" v-if="placeholder">{{ placeholder }}</div>
    <header class="intervw-data-list__header" v-if="!placeholder">
      <intrvw-header>
        <slot name="title"></slot>
      </intrvw-header>
      <div class="intervw-data-list__subtitle">
        <slot name="subtitle"></slot>
      </div>
    </header>
    <ul class="intervw-data-list__list" v-if="!placeholder && items?.length !== 0">
      <li @click="onClickItem(item)" class="intervw-data-list__item" :class="{'intervw-data-list__item--selectable': selectable, 'intervw-data-list__item--selected': modelValue === item }" v-for="(item, i) in items" :key="i">
        {{ item }}
      </li>
    </ul>
    <div class="intervw-data-list__no-results" v-if="items?.length === 0 && !placeholder">
      {{ 'No results' }}
    </div>
  </section>
</template>
<style lang="scss">
@import '../assets/scss';
.intervw-data-list {
  display: flex;
  flex-direction: column;
  background-color: $color-white;
  flex: 1 1 auto;
  box-sizing: border-box;
  &--placeholder {
    border-radius: 4px;
    border: 2px $color-grey-3 dotted;
  }
  &__placeholder, &__no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    word-wrap: break-word;
    color: $color-grey-4;
    @media (max-width: $breakpoint-mobile) {
      height: 200px;
    }
  }
  &__header {
    padding: 0 24px;
    border-bottom: 1px solid $color-grey-1;
  }
  &__subtitle {
    padding: 24px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    word-wrap: break-word
  }
  &__list {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 0;
    overflow: auto;
    margin: 0;
    padding: 0;
    @media (max-width: $breakpoint-mobile) {
      height: 400px;
    }
  }
  &__item {
    padding: 20px 24px;
    list-style: none;
    margin: 0;
    border-bottom: 1px solid $color-grey-1;
    color: $color-text-2;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    word-wrap: break-word;
    &--selectable {
      cursor: pointer;
      &:hover {
        background-color: $color-grey-2;
        transition: 200ms background-color ease-in-out;
      }
    }
    &--selected {
      color: $color-primary;
    }
  }

}
</style>