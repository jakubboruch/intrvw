import { createStore } from 'vuex'
import { getStops } from "@/api/networks/stops.network";
import type { IStop } from "@/interfaces/backendResponses";

enum SPLIT_CHAR {
  COLON =':'
}

enum ERROR {
  TIMEOUT = 10000
}

const sortStops = (stops: string[], sortState: number) => {
    return stops.slice().sort((stop1: string, stop2: string) => {
      if (sortState === 0) {
        return 0;
      }
      const stop1Name = stop1.toLowerCase();
      const stop2Name = stop2.toLowerCase();
      if (stop1Name < stop2Name) {
        return Number(-1 * sortState);
      } else if (stop1Name > stop2Name) {
        return Number(sortState);
      }
      return 0;
    })
}
export default createStore({
  state: {
    loading: false,
    error: undefined,
    stops: [{}] as IStop[],
    lines: [] as string[],
    selectedLine: undefined,
    selectedStop: undefined,
    stopsSortingOrderOnBuses: 1,
    stopsSortingOrderOnStops: 1,
    stopQuery: '',
  },
  getters: {
    times(state) {
      return [ ...new Set(state.stops.filter((stop) => stop.line === state.selectedLine && stop.stop === state.selectedStop).map((stop) => stop.time).slice().sort((time1: string, time2: string) => {
        const splittedTime1 = time1.split(SPLIT_CHAR.COLON);
        const splittedTime2 = time2.split(SPLIT_CHAR.COLON);
        if (Number(splittedTime1[0]+splittedTime1[1]) < Number(splittedTime2[0]+splittedTime2[1])) {
          return Number(-1 * state.stopsSortingOrderOnBuses);
        } else if (Number(splittedTime1[0]+splittedTime1[1]) > Number(splittedTime2[0]+splittedTime2[1])) {
          return Number(state.stopsSortingOrderOnBuses);
        }
        return 0;
      }))]
    },
    sortedStopsByLine(state) {
      return [ ...new Set(sortStops(state.stops.filter((stop) => stop.line === state.selectedLine).map((stop) => stop.stop), state.stopsSortingOrderOnBuses))];
    },
    sortedStopsByName(state) {
      return [...new Set(sortStops(state.stops.filter((stop) => stop.stop?.toLowerCase().includes(state.stopQuery.toLowerCase())).map((stop) => stop.stop), state.stopsSortingOrderOnStops))];
    }
  },
  mutations: {
    mutateStops(state, stops) {
      state.stops = stops;
      state.lines = [ ...new Set(stops.map((stop: IStop) => stop.line))].sort() as string[]
    },
    setLoadingState(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
      setTimeout(() => {
        state.error = undefined
      }, ERROR.TIMEOUT)
    },
    setStopsSortingOrderOnBuses(state, sorting) {
      state.stopsSortingOrderOnBuses = sorting;
    },
    setStopsSortingOrderOnStops(state, sorting) {
      state.stopsSortingOrderOnStops = sorting;
    },
    setSelectedLine(state, selectedLine) {
      state.selectedLine = selectedLine;
      state.selectedStop = undefined;
    },
    setSelectedStop(state, selectedStop) {
      state.selectedStop = selectedStop;
    },
    setStopQuery(state, stopQuery) {
      state.stopQuery = stopQuery;
    }
  },
  actions: {
    async getStopsFromApi(context) {
      const stops = await getStops();
      context.commit('mutateStops', stops);
    },
    setLoadingState(context, loading) {
      context.commit('setLoadingState', loading);
    },
    setError(context, error) {
      context.commit('setError', error);
    },
    setStopsSortingOrderOnBuses(context, payload) {
      context.commit('setStopsSortingOrderOnBuses', payload);
    },
    setStopsSortingOrderOnStops(context, payload) {
      context.commit('setStopsSortingOrderOnStops', payload);
    },
    setSelectedLine(context, payload) {
      context.commit('setSelectedLine', payload);
    },
    setSelectedStop(context, payload) {
      context.commit('setSelectedStop', payload);
    },
    setStopQuery(context, payload) {
      context.commit('setStopQuery', payload);
    }
  },
  modules: {
  }
})
