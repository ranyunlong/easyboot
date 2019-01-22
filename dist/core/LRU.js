"use strict";
/**
 * @class LRU
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class LRU {
    constructor(max) {
        this.size = 0;
        this.cache = new Map();
        this._cache = new Map();
        this.max = max;
    }
    get(key, options) {
        let item = this.cache.get(key);
        const maxAge = options && options.maxAge;
        // only call Date.now() when necessary
        let now;
        function getNow() {
            now = now || Date.now();
            return now;
        }
        if (item) {
            // check expired
            if (item.expired && getNow() > item.expired) {
                item.expired = 0;
                item.value = undefined;
            }
            else {
                // update expired in get
                if (maxAge !== undefined) {
                    const expired = maxAge ? getNow() + maxAge : 0;
                    item.expired = expired;
                }
            }
            return item.value;
        }
        // try to read from _cache
        item = this._cache.get(key);
        if (item) {
            // check expired
            if (item.expired && getNow() > item.expired) {
                item.expired = 0;
                item.value = undefined;
            }
            else {
                // not expired, save to cache
                this._update(key, item);
                // update expired in get
                if (maxAge !== undefined) {
                    const expired = maxAge ? getNow() + maxAge : 0;
                    item.expired = expired;
                }
            }
            return item.value;
        }
    }
    set(key, value, options) {
        const maxAge = options && options.maxAge;
        const expired = maxAge ? Date.now() + maxAge : 0;
        let item = this.cache.get(key);
        if (item) {
            item.expired = expired;
            item.value = value;
        }
        else {
            item = {
                value,
                expired,
            };
            this._update(key, item);
        }
    }
    keys() {
        const cacheKeys = new Set();
        const now = Date.now();
        for (const entry of this.cache.entries()) {
            checkEntry(entry);
        }
        for (const entry of this._cache.entries()) {
            checkEntry(entry);
        }
        function checkEntry(entry) {
            const key = entry[0];
            const item = entry[1];
            if (entry[1].value && (!entry[1].expired) || item.expired >= now) {
                cacheKeys.add(key);
            }
        }
        return Array.from(cacheKeys.keys());
    }
    _update(key, item) {
        this.cache.set(key, item);
        this.size++;
        if (this.size >= this.max) {
            this.size = 0;
            this._cache = this.cache;
            this.cache = new Map();
        }
    }
}
exports.LRU = LRU;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTFJVLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvTFJVLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7O0FBRUgsTUFBYSxHQUFHO0lBS1osWUFBWSxHQUFRO1FBSmIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixVQUFLLEdBQWtCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakMsV0FBTSxHQUFrQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBR3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFTSxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWE7UUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDekMsc0NBQXNDO1FBQ3RDLElBQUksR0FBVyxDQUFDO1FBQ2hCLFNBQVMsTUFBTTtZQUNiLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNELElBQUksSUFBSSxFQUFFO1lBQ1IsZ0JBQWdCO1lBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0wsd0JBQXdCO2dCQUN4QixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLElBQUks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