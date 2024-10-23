// a simple in-memory implementation of the 'cache-aside' caching strategy
class Cache{
    constructor(timeToLive = 10){
        this.cache = null;
        this.timeToLive = timeToLive * 60 * 1000;
        this.lastUpdatedAt = Date.now();
    }

    // a simple private method to check if the cache stored is expired
    // i.e, the cache's ttl is reached or exceeded
    #isExpired(){
        return Date.now() - this.lastUpdatedAt >= this.timeToLive
    }

    // a simple method to return the cached data if it exists
    // if it doesn't, it simply fetches the data and returns it
    readCache(){
        if (this.#isExpired() || !this.cache){
            return null;
        }
        return this.cache;
    }

    // a simple method to set the cache data in 
    // the cache storage
    setCache(data){
        this.cache = data;
        this.lastUpdatedAt = Date.now();
    }

    // a simple method that resets the cache 
    // (forces the cache to expire)
    resetCache(){
        this.cache = null;;
        this.timeToLive = new Date(0);
    }
}

module.exports = Cache;