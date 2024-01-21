<script setup lang="ts">
import type { IMenuItem } from "@/interfaces/menu";

withDefaults(
  defineProps<{
    menuItems: IMenuItem[],
  }>(), {
    menuItems: () => ([]),
  });

</script>
<template>
  <ul class="intervw-menu" v-if="menuItems?.length">
    <li class="intervw-menu__item" v-for="(menuItem, menuItemKey) in menuItems" :key="menuItemKey">
      <router-link class="intervw-menu__link" aria-current="page" :to="menuItem.path" :active-class="'intervw-menu__link--active'">{{ menuItem.name }}</router-link>
    </li>
  </ul>
</template>
<style lang="scss">
@import '../assets/scss';
.intervw-menu {
  display: flex;
  padding: 0 $space-6;
  background-color: $color-white;
  border-radius: $border-radius-primary;
  margin: 0;
  &__item {
    list-style: none;
    margin: 0;
  }
  &__link {
    display: flex;
    text-decoration: none;
    color: $color-grey-3;
    font-size: $font-size-md;
    font-weight: $font-weight-normal;
    line-height: $line-height-md;
    padding: $space-5 $space-6;
    word-wrap: break-word;
    border-bottom: 1px solid transparent;
    transition: $transition-base-time color $transition-base-ease;
    &:hover {
      color: $color-text-2;
    }
    &--active {
      border-bottom-color: $color-primary;
      color: $color-text-2;
    }
  }
}
</style>