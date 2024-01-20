<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";
import IntrvwDataInline from "@/components/IntrvwDataInline.vue";
import IntrvwDataList from "@/components/IntrvwDataList.vue";
const store = useStore();
const lines = computed(() => store.state.lines);
const selectedLine = computed(() => store.state.selectedLine);
const selectedStop = computed(() => store.state.selectedStop);
const stops = computed(() => store.getters.sortedStopsByLine);
const times = computed(() => store.getters.times);
const stopsPlaceholder = computed(() => {
  if (!selectedLine.value) {
    return 'Please select the bus line first'
  } else {
    return ''
  }
})
const timesPlaceholder = computed(() => {
  if (!selectedLine.value) {
    return 'Please select the bus line first'
  } else if (!selectedStop.value) {
    return 'Please select the bus stop first'
  } else {
    return ''
  }
})
const sortIcon = computed(() => {
  switch(store.state.stopsSortingOrderOnBuses) {
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
const onLineChange = (line) => {
  const _line = line !== selectedLine.value ? line : undefined;
  store.dispatch('setSelectedLine', _line)
};
const onStopChange = (stop) => {
  const _stop = stop !== selectedStop.value ? stop : undefined;
  store.dispatch('setSelectedStop', _stop)
};
const onSortChange = () => {
  let stopsSortingOrder = store.state.stopsSortingOrderOnBuses;
  switch(store.state.stopsSortingOrderOnBuses) {
    case 0: { stopsSortingOrder = 1; break; }
    case 1: { stopsSortingOrder = -1; break; }
    case -1: { stopsSortingOrder = 0; break; }
    default: { stopsSortingOrder = 0 }
  }
  store.dispatch('setStopsSortingOrderOnBuses', stopsSortingOrder);
}

</script>
<template>
  <div class="bus-lines">
    <intrvw-data-inline :modelValue="selectedLine" @update:modelValue="onLineChange($event)" :title="'Select Bus Line'" :items="lines"></intrvw-data-inline>
    <div class="bus-lines__data-container">
      <intrvw-data-list class="bus-lines__list" :modelValue="selectedStop" :selectable="true" :placeholder="stopsPlaceholder" @update:modelValue="onStopChange($event)" :items="stops">
        <template #title>
          {{ `Bus Line: ${selectedLine}` }}
        </template>
        <template #subtitle>
          {{ `Bus Stops` }} <i class="sort" :class="sortIcon" @click="onSortChange"></i>
        </template>
      </intrvw-data-list>

      <intrvw-data-list class="bus-lines__list" :placeholder="timesPlaceholder" :items="times">
        <template #title>
          {{ `Bus Stop: ${selectedStop}` }}
        </template>
        <template #subtitle>
          {{ `Time` }}
        </template>
      </intrvw-data-list>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/scss';
@import '../assets/scss/fonts';

.bus-lines {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
  height: 0;
  &__data-container {
    display: flex;
    flex: 1 1 auto;
    gap: 16px;
    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
    }
  }
  &__list {
    width: 50%;
    @media (max-width: $breakpoint-mobile) {
      width: 100%;
    }
  }
}
.sort {
  font-size: 10px;
  padding: 5px;
  color: $color-grey-3;
}
</style>