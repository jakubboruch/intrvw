<script setup lang="ts">
interface IMenuItem {
  path: string;
  name: string;
}
const props = withDefaults(
    defineProps<{
      menuItems: IMenuItem[],
    }>(), {
      menuItems: () => ([{}]),
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
@import '../assets/scss/colors';
.intervw-menu {
  display: flex;
  padding: 0 24px;
  background-color: $color-white;
  border-radius: 4px;
  margin: 0;
  &__item {
    list-style: none;
    margin: 0;
  }
  &__link {
    display: flex;
    text-decoration: none;
    color: $color-link;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    padding: 20px 24px;
    word-wrap: break-word;
    border-bottom: 1px solid transparent;
    transition: 200ms color ease-in-out;
    &:hover {
      color: $color-link-active;
    }
    &--active {
      border-bottom-color: $color-primary;
      color: $color-link-active;
    }
  }
}
</style>