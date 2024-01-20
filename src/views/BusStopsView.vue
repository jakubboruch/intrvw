<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";
import IntrvwDataInline from "@/components/IntrvwDataInline.vue";
import IntrvwDataList from "@/components/IntrvwDataList.vue";
import IntrvwTextfield from "@/components/IntrvwTextfield.vue";

const store = useStore();
const stops = computed(() => store.getters.sortedStopsByName);
const stopQuery = ref(store.state.stopQuery);

const sortIcon = computed(() => {
  switch(store.state.stopsSortingOrderOnStops) {
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

const onSortChange = () => {
  let stopsSortingOrder = store.state.stopsSortingOrderOnStops;
  switch(store.state.stopsSortingOrderOnStops) {
    case 0: { stopsSortingOrder = 1; break; }
    case 1: { stopsSortingOrder = -1; break; }
    case -1: { stopsSortingOrder = 0; break; }
    default: { stopsSortingOrder = 0 }
  }
  store.dispatch('setStopsSortingOrderOnStops', stopsSortingOrder);
}

const onStopQueryChange = (event: InputEvent) => {
  const query = event?.target?.value;
  if (!query) {
    return;
  }
  store.dispatch('setStopQuery', query)
}
watch(
    () => stopQuery.value,
    () =>   store.dispatch('setStopQuery', stopQuery.value)
)

</script>
<template>
  <div class="bus-stops">
    <div class="bus-stops__data-container">
      <intrvw-data-list class="bus-stops__list" :modelValue="selectedStop" :items="stops">
        <template #title>
          <intrvw-textfield v-model="stopQuery" :icon="'icon-search'" :placeholder="'Search...'">
          </intrvw-textfield>
        </template>
        <template #subtitle>
          {{ `Bus Stops` }} <i class="sort" :class="sortIcon" @click="onSortChange"></i>
        </template>
      </intrvw-data-list>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/scss';

.bus-stops {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
  height: 0;
  &__data-container {
    display: flex;
    flex: 1 1 auto;
    gap: 16px;
  }
  &__list {
    width: 50%;
  }
}
</style>