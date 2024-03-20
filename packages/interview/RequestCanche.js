function createCachedRequest(requestFunction) {
  const cache = new Map();
  return function cachedRequest(options) {
    options = options || {};
    if (
      options.cacheTime !== undefined &&
      (typeof options.cacheTime !== 'number' || options.cacheTime < 0)
    ) {
      throw new Error('Invalid cacheTime option');
    }
    const cacheKey = JSON.stringify(options);
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      const { data, time, error } = cachedData;
      if (
        !error &&
        time &&
        options.cacheTime !== undefined &&
        Date.now() - time < options.cacheTime
      ) {
        return Promise.resolve(data);
      }
    }
    const shouldCacheError =
      options.shouldCacheError !== undefined ? options.shouldCacheError : true;
    const requestPromise = requestFunction(options)
      .then((data) => {
        const time = Date.now();
        const cachedData = { data, time };
        cache.set(cacheKey, cachedData);
        return data;
      })
      .catch((error) => {
        if (shouldCacheError) {
          const time = Date.now();
          const cachedData = { error, time };
          cache.set(cacheKey, cachedData);
        }
        throw error;
      });
    cache.set(cacheKey, { requestPromise });
    return requestPromise;
  };
}

const requestUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '我是你'
      });
    }, 3000);
  });
};

const cachedUserInfoRequest = createCachedRequest(requestUserInfo);
function getUserInfo(options) {
  return cachedUserInfoRequest(options);
}
