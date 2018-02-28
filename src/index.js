const mitt = require('mitt');

// Clock compensates for drift due to expensive processing
// or inaccurate firing of setTimeout / setInterval.
module.exports =
class Clock {

    constructor(interval, handler) {
        Object.assign(this, mitt());

        this._interval = interval || 60 * 1000;
        this._timer = null;

        this._tick = this._tick.bind(this);


        if (typeof handler === 'function')
            this.on('tick', handler);
    }

    start() {
        this._setTick();
        this._timer = setTimeout(this._tick, this._interval);
    }

    stop() {
        clearTimeout(this._timer);
        this._timer = null;
    }

    _elapsed() {
        // Assume the first tick has been fired at correct interval.
        if (!this._lastTick)
            return this._interval;

        return (Date.now() - this._lastTick);
    }

    _setTick() {
        // compensation for timeout firing too early / late
        const correction = (this._elapsed() - this._interval);

        this._lastTick = Date.now() - correction;
    }

    _nextTick() {
        // Calculate the time elapsed while processing 'tick' event
        // and correct for it.
        const elapsed = this._elapsed();
        const remaining = this._interval - elapsed;
        const timeout = Math.max(remaining, 0);

        clearTimeout(this._timer);
        this._timer = setTimeout(this._tick, timeout);
    }

    _tick() {
        this._setTick();

        this.emit('tick');

        if (this._timer)
            this._nextTick();
    }
};
