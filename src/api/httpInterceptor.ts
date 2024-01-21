import http from './http';
import store from '../store';
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import type { App } from 'vue';

export default {
    install: (app: App): void => {
        app.config.globalProperties.$http = http;
        const $http = app.config.globalProperties.$http;

        const handleRequest = (config: AxiosRequestConfig) => {
            store.commit('setLoadingState', true);
            return config;
        };

        const handleResponse = (response: AxiosResponse) => {
            store.commit('setLoadingState', false);
            return response;
        };

        const handleError = (err: Error | AxiosError) => {
            store.commit('setError', err.message);
            store.commit('setLoadingState', false);
            return err;
        }
        $http.interceptors.request.use(handleRequest, handleError);
        $http.interceptors.response.use(handleResponse, handleError);
    }
}