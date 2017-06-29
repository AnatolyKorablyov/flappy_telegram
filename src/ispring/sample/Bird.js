goog.provide("ispring.sample.Bird");

goog.require("ispring.sample.Definition");

goog.scope(function() {
    const GAME_CONFIG = ispring.sample.Definition;
    const config = new GAME_CONFIG();

    const Point = goog.math.Coordinate;
    const Size = goog.math.Size;
    
    ispring.sample.Bird = goog.defineClass(null, {
        constructor: function () {
            /**
             *
             * @type {goog.math.Coordinate}
             * @private
             */
            this._pos = new Point(config._BIRD_POSITION.x, config._BIRD_POSITION.y);
            /**
             *
             * @type {goog.math.Size}
             * @private
             */
            this._size = new Size(config._BIRD_SIZE.width, config._BIRD_SIZE.height);
            /**
             *
             * @type {number}
             * @private
             */
            this._speed = 0;
            /**
             *
             * @type {Image}
             * @private
             */
            this._birdImage = new Image();
            /**
             *
             * @type {string}
             */
            this._birdImage.src = config._PATH_TO_IMAGES + config._BIRD_FILE_NAME;

        },
        getImage: function()
        {
            return this._birdImage;
        },
        getPosition: function()
        {
            return this._pos.clone();
        },
        getSize: function()
        {
            return this._size.clone();
        },
        setPositionOfTheSpeed: function()
        {
            this._pos.y += this._speed;
        },
        incSpeed: function()
        {
            this._speed++;
        },
        takeoffSpeed: function()
        {
            this._speed = config._BIRD_FLY_NUMBER;
        },
        deleteBird: function ()
        {
            /**
             *
             * @type {null}
             * @private
             */
            this._birdImage = null;
            /**
             *
             * @type {null}
             * @private
             */
            this._pos = null;
            /**
             *
             * @type {null}
             * @private
             */
            this._size = null;
            /**
             *
             * @type {number}
             * @private
             */
            this._speed = 0;
        }
    });
});