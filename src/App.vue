<script setup lang="ts">
import { useStore } from 'vuex'
import IntrvwMenu from "@/components/IntrvwMenu.vue";

const store = useStore();
store.dispatch('getStopsFromApi');

const menu = [{ name: 'Bus Lines', path: '/bus-lines' }, { name: 'Stops', path: '/bus-stops' }];

</script>
<template>
  <div class="timetable">
    <h1>Timetable</h1>
    <IntrvwMenu :init-active-path="menu?.[0].path" :menu-items="menu"></IntrvwMenu>
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
  padding: 40px 32px;
  font-family: 'Inter', sans-serif;
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
  gap: 16px;
  h1 {
    color: #1A1A1A;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    word-wrap: break-word;
    margin: 0;
    display: flex;
  }
}
</style>