<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from "vuex";
import IntrvwDataInline from "@/components/IntrvwDataInline.vue";
import IntrvwDataList from "@/components/IntrvwDataList.vue";
import IntrvwSortBtn from "@/components/IntrvwSortBtn.vue";
import { TEXTS } from "@/enums/language.enum";

const store = useStore();
const lines = computed(() => store.state.lines);
const selectedLine = computed(() => store.state.selectedLine);
const selectedStop = computed(() => store.state.selectedStop);
const stops = computed(() => store.getters.sortedStopsByLine);
const times = computed(() => store.getters.times);
const stopsPlaceholder = computed(() => {
  if (!selectedLine.value) {
    return TEXTS.PLEASE_SELECT_BUS_LINE
  } else {
    return ''
  }
})
const timesPlaceholder = computed(() => {
  if (!selectedLine.value) {
    return TEXTS.PLEASE_SELECT_BUS_LINE
  } else if (!selectedStop.value) {
    return TEXTS.PLEASE_SELECT_STOP
  } else {
    return ''
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
const onSortChange = (newSortValue) => {
  store.dispatch('setStopsSortingOrderOnBuses', newSortValue);
}

</script>
<template>
  <div class="bus-lines">
    <intrvw-data-inline :modelValue="selectedLine" @update:modelValue="onLineChange($event)" :title="TEXTS.SELECT_BUS_LINE" :items="lines"></intrvw-data-inline>
    <div class="bus-lines__data-container">
      <intrvw-data-list class="bus-lines__list" :modelValue="selectedStop" :selectable="true" :placeholder="stopsPlaceholder" @update:modelValue="onStopChange($event)" :items="stops">
        <template #title>
          {{ `${TEXTS.BUS_LINE}: ${selectedLine}` }}
        </template>
        <template #subtitle>
          {{ TEXTS.BUS_STOPS }} <intrvw-sort-btn :model-value="store.state.stopsSortingOrderOnBuses" @update:model-value="onSortChange"></intrvw-sort-btn>
        </template>
      </intrvw-data-list>

      <intrvw-data-list class="bus-lines__list" :placeholder="timesPlaceholder" :items="times">
        <template #title>
          {{ `${TEXTS.BUS_STOP}: ${selectedStop}` }}
        </template>
        <template #subtitle>
          {{ TEXTS.TIME }}
        </template>
      </intrvw-data-list>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/scss';

.bus-lines {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  flex: 1 1 auto;
  height: 0;
  &__data-container {
    display: flex;
    flex: 1 1 auto;
    gap: $space-4;
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
  font-size: $font-size-xs;
  padding: 5px;
  color: $color-grey-3;
}
</style>