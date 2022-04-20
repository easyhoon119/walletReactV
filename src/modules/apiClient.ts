import axios from "axios";

export const apiClient = axios.create();

//axios 모듈
export const customApiClient = async (method: any, url: string, data?: any) => {
    try {
        const result = await apiClient(url, {
            method,
            data,
            headers: {},
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
