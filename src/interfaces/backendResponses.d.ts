import {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

interface IStop {
    line: number,
    order: number,
    stop: 'string'
    time: 'string'
    [key: string]: string | number;
}

interface IBackendResponse {
    config: AxiosRequestConfig;
    data: IStop[];
    headers: AxiosRequestHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}

export { IStop, IBackendResponse }