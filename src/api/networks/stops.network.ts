import http from "@/api/http";
import { IBackendResponse } from "@/interfaces/backendResponses";

enum TIMETABLE_ENDPOINTS {
    stops = '/stops'
}

const getStops = async () => {
    try {
        const response:IBackendResponse = await http.get(TIMETABLE_ENDPOINTS.stops);
        return response?.data;
    } catch (e) {
        console.error(e);
    }
}

export { getStops }