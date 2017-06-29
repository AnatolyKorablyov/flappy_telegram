goog.provide("ispring.sample.GameView");

goog.require("ispring.sample.Definition");

goog.scope(function() {
    const GAME_CONFIG = ispring.sample.Definition;
    const config = new GAME_CONFIG();

    const Point = goog.math.Coordinate;
    const Size = goog.math.Size;
    /**
     * @constructor
     */
    ispring.sample.GameView = goog.defineClass(null,
        {
            constructor: function (canvas) {
                /**
                 *
                 * @type {{width: *, height: *}}
                 * @private
                 */
                this._canvasSize = {width: canvas.width, height: canvas.height};
                /**
                 *
                 * @type {CanvasRenderingContext2D|*|Object}
                 * @private
                 */
                this._context = canvas.getContext("2d");

                //this._recordNode = document.getElementById("record");

                /**
                 *
                 * @type {Element}
                 * @private
                 */
                this._scoreNode = document.getElementById("score");
                this._scoreNode.style.font = config._FONT;
                this._scoreNode.style.color = "white";
                this._scoreNode.style.position = "absolute";
                this._scoreNode.style.left = config._CANVAS_SIZE.width - config._POS_X_IN_CANVAS_SCORE + "px";
                this._scoreNode.style.top = 0 + "px";

            },
            clearCanvas: function () {
                this._context.clearRect(0, 0, this._canvasSize.width, this._canvasSize.height);
            },
            drawShapesScaling: function (shape, position, size, scalingPos, imageSize) {
                this._context.drawImage(shape, scalingPos.x, scalingPos.y, imageSize.width, imageSize.height, position.x, position.y, size.width, size.height);
            },
            drawShapes: function (shape, position, size) {
                this._context.drawImage(shape, position.x, position.y, size.width, size.height);
            },
            drawScore: function (score) {
                this._scoreNode.innerHTML = "Score: " + score;
            }
        });
});