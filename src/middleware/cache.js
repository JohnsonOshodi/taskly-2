const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

exports.cache = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url; 
    client.get(key, (err, cachedResponse) => {
        if (cachedResponse) {
            res.send(JSON.parse(cachedResponse));
        } else {
          res.sendResponse = res.send;
          res.send = (body) =>  {
            client.set(key, JSON.stringify(body), 'EX', 3600); // Cache for 1 hour 
            res.sendResponse(body);
          };
          next();
        }
    });
};