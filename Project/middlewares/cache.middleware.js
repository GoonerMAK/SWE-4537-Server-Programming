const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedData = cache.get(key);
  
    if (cachedData) {
      console.log('Data retrieved from cache.');
      return res.json(cachedData);
    }
  
    next();
};