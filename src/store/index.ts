import { createStore } from 'vuex';
import { ActionContext } from "vuex";
import { getStops } from "@/api/networks/stops.network";
import type { IStop } from "@/interfaces/backendResponses";

type Context = ActionContext<IState, IState>;

export interface IState {
  loading: boolean;
  error: string | undefined;
  stops: IStop[];
  lines: number[];
  selectedLine: string | undefined,
  selectedStop: string | undefined,
  stopsSortingOrderOnBuses: number,
  stopsSortingOrderOnStops: number,
  stopQuery: string,
}

enum SPLIT_CHAR {
  COLON =':'
}

enum ERROR {
  TIMEOUT = 10000
}

const sortStops = (stops: IStop[], sortState: number, sortBy = 'order') => {
    return stops.slice().sort((stop1: IStop, stop2: IStop) => {
      if (sortState === 0) {
        return 0;
      }
      const stop1Order = stop1[sortBy];
      const stop2Order = stop2[sortBy];
      if (stop1Order < stop2Order) {
        return Number(-1 * sortState);
      } else if (stop1Order > stop2Order) {
        return Number(sortState);
      }
      return 0;
    })
}
export default createStore<IState>({
  state: {
    loading: false,
    error: undefined,
    stops: [{}] as IStop[],
    lines: [] as number[],
    selectedLine: undefined,
    selectedStop: undefined,
    stopsSortingOrderOnBuses: 1,
    stopsSortingOrderOnStops: 1,
    stopQuery: '',
  },
  getters: {
    times(state: IState) {
      return [ ...new Set(state.stops.filter((stop) => String(stop.line) === String(state.selectedLine) && stop.stop === state.selectedStop).map((stop) => stop.time).slice().sort((time1: string, time2: string) => {
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
    sortedStopsByLine(state: IState) {
      return [ ...new Set(sortStops(state.stops.filter((stop) => String(stop.line) === String(state.selectedLine)), state.stopsSortingOrderOnBuses).map((stop) => stop.stop))];
    },
    sortedStopsByName(state: IState) {
      return [...new Set(sortStops(state.stops.filter((stop) => stop.stop?.toLowerCase().includes(state.stopQuery.toLowerCase())), state.stopsSortingOrderOnStops, 'stop').map((stop) => stop.stop))];
    }
  },
  mutations: {
    mutateStops(state: IState, stops: IStop[]) {
      state.stops = stops;
      state.lines = [ ...new Set(stops.map((stop: IStop) => stop.line))].sort()
    },
    setLoadingState(state: IState, loading: boolean) {
      state.loading = loading;
    },
    setError(state: IState, error: string) {
      state.error = error;
      setTimeout(() => {
        state.error = undefined
      }, ERROR.TIMEOUT)
    },
    setStopsSortingOrderOnBuses(state: IState, sorting: number) {
      state.stopsSortingOrderOnBuses = sorting;
    },
    setStopsSortingOrderOnStops(state: IState, sorting: number) {
      state.stopsSortingOrderOnStops = sorting;
    },
    setSelectedLine(state: IState, selectedLine: string) {
      state.selectedLine = selectedLine;
      state.selectedStop = undefined;
    },
    setSelectedStop(state: IState, selectedStop: string) {
      state.selectedStop = selectedStop;
    },
    setStopQuery(state: IState, stopQuery: string) {
      state.stopQuery = stopQuery;
    }
  },
  actions: {
    async getStopsFromApi(context: Context) {
      const stops = await getStops();
      context.commit('mutateStops', stops);
    },
    setLoadingState(context: Context, loading: boolean) {
      context.commit('setLoadingState', loading);
    },
    setError(context: Context, error: string) {
      context.commit('setError', error);
    },
    setStopsSortingOrderOnBuses(context: Context, payload: string) {
      context.commit('setStopsSortingOrderOnBuses', payload);
    },
    setStopsSortingOrderOnStops(context: Context, payload: string) {
      context.commit('setStopsSortingOrderOnStops', payload);
    },
    setSelectedLine(context: Context, payload: string) {
      context.commit('setSelectedLine', payload);
    },
    setSelectedStop(context: Context, payload: string) {
      context.commit('setSelectedStop', payload);
    },
    setStopQuery(context: Context, payload: string) {
      context.commit('setStopQuery', payload);
    }
  },
})
