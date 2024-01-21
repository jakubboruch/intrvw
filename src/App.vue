<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { TEXTS } from "@/enums/language.enum";
import type { IMenuItem } from "@/interfaces/menu";
import IntrvwLoadingBar from "@/components/IntrvwLoadingBar.vue";
import IntrvwMenu from "@/components/IntrvwMenu.vue";
import IntrvwToast from "@/components/IntrvwToast.vue";

const store = useStore();
const loading = computed(() => store.state.loading);
const error = computed(() => store.state.error);
const menu: IMenuItem[] = [
  { name: TEXTS.BUS_LINES, path: '/bus-lines' },
  { name: TEXTS.STOPS, path: '/stops' }
];

store.dispatch('getStopsFromApi');

</script>
<template>
  <intrvw-loading-bar v-if="loading"></intrvw-loading-bar>
  <intrvw-toast v-if="error" :type="'error'">{{ error }}</intrvw-toast>
  <div class="timetable">
    <h1>{{ TEXTS.TIMETABLE }}</h1>
    <IntrvwMenu :menu-items="menu"></IntrvwMenu>
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap';
@import 'assets/scss';
html {
  height: 100%;
}
body {
  box-sizing: border-box;
  background-color: $background-color !important;
  padding: $space-10 $space-8;
  font-family: $font-family;
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.timetable {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: $space-4;
  h1 {
    color: $color-text-1;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    line-height: $line-height-lg;
    word-wrap: break-word;
    margin: 0;
    display: flex;
  }
}
</style>