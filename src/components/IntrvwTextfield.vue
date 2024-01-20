<script setup lang="ts">
import {ref, watch} from 'vue';
import IntrvwHeader from "@/components/IntrvwHeader.vue";

const props = withDefaults(
    defineProps<{
      modelValue: string,
      placeholder?: string
      icon?: string
    }>(), {
      modelValue: '',
      placeholder: '',
      icon: ''
    });

const emit = defineEmits<{
  e: 'update:modelValue', data: string
}>()

const localModelValue = ref(props.modelValue);
const focus = ref(false);

watch(
    () => props.modelValue.value,
    () => localModelValue.value = props.modelValue.value
)

watch(
    () => localModelValue.value,
    () => {
      emit('update:modelValue', localModelValue.value)
      }
)

</script>
<template>
  <span class="intervw-textfield">
    <input class="intervw-textfield__field" :class="{'intervw-textfield__field--icon': icon}" type="text" v-model="localModelValue" @focus="focus = true" @blur="focus = false">
    <span class="intervw-textfield__placeholder" v-if="placeholder && !focus">{{ placeholder }}</span>
    <span class="intervw-textfield__icon" :class="{'intervw-textfield__icon--focus': focus}">
      <i :class="icon"></i>
    </span>
  </span>
</template>
<style lang="scss">
@import '../assets/scss';
@import '../assets/scss/fonts';
.intervw-textfield {
  position: relative;
  display: inline-flex;
  &__field {
    background: none;
    padding: 12px 16px;
    line-height: 16px;
    color: $color-text-1;
    font-size: 12px;
    font-weight: 400;
    word-wrap: break-word;
    border: 1px solid $color-grey-1;
    border-radius: $border-radius-primary;
    min-width: 288px;
    transition: 200ms border-color ease-in-out;
    &--icon {
      padding-right: 32px;
    }
    &:focus {
      color: $color-text-1;
      outline: none;
      border-color: $color-primary;
    }
  }
  &__placeholder {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    pointer-events: none;
    font-size: 12px;
    font-weight: 400;
    word-wrap: break-word;
    color: $color-grey-3;
    padding: 0 16px;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }
  &__icon {
    pointer-events: none;
    position: absolute;
    right: 16px;
    display: flex;
    height: 100%;
    align-items: center;
    line-height: 0;
    color: $color-grey-3;
    &--focus {
      color: $color-primary;
    }
  }
}
</style>