import NodeCache  from "node-cache"


// Singleton class
export class Cache {
    CACHE_TIMEOUT = process.env["CACHE_TIMEOUT"] || 1000 * 60 * 60;
    private static _instance: Cache;
    cache: NodeCache;

    constructor() {
      this.cache = new NodeCache();
    }

    public getCache(): NodeCache {
        return this.cache;
    }

    public getCacheTimeout(): string | number {
        return this.CACHE_TIMEOUT;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}