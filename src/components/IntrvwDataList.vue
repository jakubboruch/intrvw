<script setup lang="ts">
import IntrvwHeader from "@/components/IntrvwHeader.vue";

enum TEXTS {
  NO_RESULTS = 'No Results'
}

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
      {{ TEXTS.NO_RESULTS }}
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
    border-radius: $border-radius-primary;
    border: 2px $color-grey-3 dotted;
  }
  &__placeholder, &__no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    font-size: $font-size-md;
    font-weight: $font-weight-light;
    line-height: $line-height-md;
    word-wrap: break-word;
    color: $color-grey-4;
    @media (max-width: $breakpoint-mobile) {
      height: 200px;
    }
  }
  &__header {
    padding: 0 $space-6;
    border-bottom: 1px solid $color-grey-1;
  }
  &__subtitle {
    padding: $space-6 0;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    line-height: $line-height-sm;
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
    padding: $space-5 $space-6;
    list-style: none;
    margin: 0;
    border-bottom: 1px solid $color-grey-1;
    color: $color-text-2;
    font-size: $font-size-sm;
    font-weight: $font-weight-light;
    line-height: $line-height-sm;
    word-wrap: break-word;
    &--selectable {
      cursor: pointer;
      &:hover {
        background-color: $color-grey-2;
        transition: $transition-base-time background-color $transition-base-ease;
      }
    }
    &--selected {
      color: $color-primary;
    }
  }

}
</style>