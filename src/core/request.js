import axios from 'axios';
/**
 * @process.env
 * VITE 에서는 import.meta.env 로 가져온다.
 */
const request = axios.create({
    baseURL: import.meta.env.VUE_APP_BASE_API,
    timeout: 6000
});

/**
 * @cancel
 * server 단 취소는 안되고 , front 에서 취소
 */
// request.isCancel = axios.isCancel;

request.interceptors.request.use(
    // config => {
    // },
    // error => {
    //     return Promise.reject(error);
    // }
);

request.interceptors.response.use(
    response => {
        if (config.baseURL === '/') return Promise.resolve(resData);
        else return Promise.reject(response);
    },
    error => {
        // ~ axios에서 서버 요청을 취소한 경우에 실행.
        return Promise.reject(error);
    }
);

export const CancelToken = axios.CancelToken;

export default request;
