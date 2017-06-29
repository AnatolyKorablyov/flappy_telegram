goog.provide("sample.MyTimer");

goog.require("goog.Timer");

goog.scope(function() {

    /**
     * @constructor
     * @param {!Function} onTickCallback
     */
    sample.MyTimer = goog.defineClass(null, {
        constructor: function(onTickCallback) {
            /** @private {!Function} */
            this._onTickCallback = onTickCallback;

            /** @private {?number} */
            this._startTime = null;

            /** @private {!number} */
            this._time = null;

            /** (private) {!goog.Timer} */
            this._timerObject = new goog.Timer(sample.MyTimer.INTERVAL);
            goog.events.listen(this._timerObject, goog.Timer.TICK, this._invalidateTime, false, this);
        },
    
        start: function()
        {
            if (this._startTime != null)
            {
                throw Error("timer is running");
            }
            this._startTime = goog.now();
            this._timerObject.start();
        },
    
        stop: function()
        {
            if (this._startTime == null)
            {
                return;
            }
            this._timerObject.stop();
            this.invalidateTime();
            this._startTime = null;
        },
    
        /**
         * @return {!number}
         */
        time: function()
        {
            return this._time;
        },

        /**
         * @private
         */
        _invalidateTime: function()
        {
            this._time = goog.now() - this._startTime;

            this._onTickCallback();
        },

        statics: {
            /**
             * @type {Number}
             */
            INTERVAL: 200
        }
    });
});