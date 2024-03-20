// 为axios添加重试功能
import axios from 'axios';

export default function RetryRequest() {
  axios.interceptors.response.use(undefined, (err) => {
    let config = err.config;
    if (!config || !config.retry) return Promise.reject(err);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    let backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(() => {
      return axios(config);
    });
  });
}
