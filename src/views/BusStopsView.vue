<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";
import IntrvwDataList from "@/components/IntrvwDataList.vue";
import IntrvwTextfield from "@/components/IntrvwTextfield.vue";
import IntrvwSortBtn from "@/components/IntrvwSortBtn.vue";
import { TEXTS } from "@/enums/language.enum";

const store = useStore();
const stops = computed(() => store.getters.sortedStopsByName);
const stopQuery = ref(store.state.stopQuery);

const onSortChange = (newValue: number) => {
  store.dispatch('setStopsSortingOrderOnStops', newValue);
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
          <intrvw-textfield v-model="stopQuery" :icon="'icon-search'" :placeholder="TEXTS.SEARCH">
          </intrvw-textfield>
        </template>
        <template #subtitle>
          {{ TEXTS.BUS_STOPS }} <intrvw-sort-btn :model-value="store.state.stopsSortingOrderOnStops" @update:model-value="onSortChange"></intrvw-sort-btn>
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
  gap: $space-4;
  flex: 1 1 auto;
  height: 0;
  &__data-container {
    display: flex;
    flex: 1 1 auto;
    gap: $space-4;
  }
  &__list {
    width: 50%;
  }
}
</style>