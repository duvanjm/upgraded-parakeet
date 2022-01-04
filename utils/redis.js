const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: '127.0.0.1',
      port: 5000,
    });
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });
  }

  isAlive() {
    return this.client.connected();
  }

  async get(key) {
    const k = await this.client.get(key);
    return k;
  }

  async set(key, val, duration) {
    await this.client.set(key, val);
    await this.client.expire(key, duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.export = redisClient;
