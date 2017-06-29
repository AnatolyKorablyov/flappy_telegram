goog.provide("ispring.sample.GameController");

goog.require("ispring.sample.GameModel");
goog.require("ispring.sample.GameView");
goog.require("goog.math.Rect");

goog.scope(function()
{
    const MODEL = ispring.sample.GameModel;
    const VIEW = ispring.sample.GameView;
    const GAME_CONFIG = ispring.sample.Definition;
    const config = new GAME_CONFIG();

    /**
     *
     * @type {ispring.sample.GameController}
     */
    var THIS_PTR;
    const Rect = goog.math.Rect;
    /**
     * @constructor
     */
    ispring.sample.GameController = goog.defineClass(null, {
        constructor: function(canvas)
        {
            /**
             *
             * @type {boolean}
             * @private
             */
            this._game = false;
            THIS_PTR = this;
            /**
             * @private
             */
            this._canvas = canvas;
            /**
             *
             * @type {ispring.sample.GameModel}
             * @private
             */
            this._model = new MODEL();
            /**
             *
             * @type {ispring.sample.GameView}
             * @private
             */
            this._view = new VIEW(canvas);
            this.gameStartMenu();
        },
        gameStartMenu: function()
        {
            var btn = document.createElement("button");
            btn.style.position = "absolute";
            btn.style.left = config._CANVAS_SIZE.width / 2 + "px";
            btn.style.top = config._CANVAS_SIZE.height / 2 + "px";
            var textBtn = document.createTextNode("START!");
            btn.appendChild(textBtn);

            const thisPtr = this;
            btn.onclick = function ()
            {
                btn.parentNode.removeChild(btn);
                thisPtr.gameStart(thisPtr._canvas);
            };
            document.body.appendChild(btn);
        },
        gameDeathMenu: function ()
        {
            this._game = false;
            this._model.stopSounds();
            this._model.playAudioBirdDie();
            clearInterval(this._intervalId);
            clearInterval(this._intervalAnimationId);


            var btnRS = document.createElement("button");
            btnRS.style.position = "absolute";
            btnRS.style.left = config._CANVAS_SIZE.width / 2 + "px";
            btnRS.style.top = config._CANVAS_SIZE.height / 2 + "px";
            var textBtnRS = document.createTextNode("RESTART");
            btnRS.appendChild(textBtnRS);

            var btnStats = document.createElement("button");
            btnStats.style.position = "absolute";
            btnStats.style.left = config._CANVAS_SIZE.width / 2 + 10 + "px";
            btnStats.style.top = config._CANVAS_SIZE.height / 2 + 30 + "px";
            var textBtnStats = document.createTextNode("STATS");
            btnStats.appendChild(textBtnStats);

            const thisPtr = this;
            btnRS.onclick = function ()
            {
                btnRS.parentNode.removeChild(btnRS);
                btnStats.parentNode.removeChild(btnStats);
                thisPtr.gameStart(thisPtr._canvas);

            };

            // TODO действие для stats

            document.body.appendChild(btnRS);
            document.body.appendChild(btnStats);
        },
        gameStart: function(canvas)
        {

            this._game = true;
            this._model.stopSounds();

            this._model.resetData();
            this._model.playSoundtrack();
            const thisPtr = this;
            window.addEventListener('keypress', thisPtr.handlerKeyPress);
            canvas.onmouseup = function()
            {
                thisPtr.flightCeiling();
            };

            /**
             *
             * @type {number}
             * @private
             */
            this._intervalId = setInterval(function()
            {
                thisPtr.gameInMotion();
            }, 1000 / 30);

            /**
             *
             * @type {number}
             * @private
             */
            this._intervalAnimationId = setInterval(function()
            {
                thisPtr.handlerBirdAnimation();
            }, 1000 / 10);
        },
        flightCeiling: function()
        {
            if (this._game)
            {
                this._model.playAudioFlyBird();
                if (this._model.getBirdPosition().y + this._model.getBirdSize().height / 2 > 0) {
                    this._model.flyBird();
                }
                else {
                    this._model.fallBird();
                }
            }
        },
        handlerKeyPress: function(e)
        {
            if (e.keyCode == config._SPACE)
            {
                THIS_PTR.flightCeiling();
            }
        },
        drawObjects: function()
        {
            this._view.clearCanvas();
            this._view.drawShapesScaling(this._model.getBackgroundImage(), config._STARTING_POSITION, config._CANVAS_SIZE, config._STARTING_POSITION, config._BACKGROUND_SIZE);
            this._view.drawShapesScaling(this._model.getBirdImage(), this._model.getBirdPosition(), this._model.getBirdSize(), this._model.getBirdAnimationPos(), config._BIRD_SIZE_IN_IMAGE);
            for (var i = 0; i < this._model.getPipeArrayLength(); ++i)
            {
                this._view.drawShapes(this._model.getPipeImage(i), this._model.getPipePosition(i)[0], this._model.getPipeSize(i)[0]);
                this._view.drawShapes(this._model.getPipeImage(i), this._model.getPipePosition(i)[1], this._model.getPipeSize(i)[1]);
            }
            this._view.drawScore(this._model.getScore());
        },
        gameInMotion: function ()
        {
            this._model.moveObjects();
            this.drawObjects();
            this.handlerPipes();
            if (this._model.getBirdPosition().y + this._model.getBirdSize().height > config._CANVAS_SIZE.height)
            {
                this.gameDeathMenu();
            }
        },
        checkCollision: function(posA, sizeA, posB, sizeB)
        {
            var rectA = new Rect(posA.x, posA.y, sizeA.width, sizeA.height);
            var rectB = new Rect(posB.x, posB.y, sizeB.width, sizeB.height);
            return rectA.intersection(rectB);
        },
        handlerPipes: function()
        {
            var birdPos = this._model.getBirdPosition();
            var birdSize = this._model.getBirdSize();
            for (var i = 0; i < this._model.getPipeArrayLength(); ++i)
            {
                var topPipePos = this._model.getPipePosition(i)[0];
                var topPipeSize = this._model.getPipeSize(i)[0];
                var downPipePos = this._model.getPipePosition(i)[1];
                var downPipeSize = this._model.getPipeSize(i)[1];

                if (!this._model.getPipePassage(i)
                    && topPipePos.x +  topPipeSize.width < birdPos.x)
                {
                    this._model.setPipePassage(i);
                    this._model.playAudioTakePoint();
                    this._model.incScore();
                }
                if (topPipePos.x + topPipeSize.width < 0)
                {
                    this._model.deletePipe(i);
                    this._model.addPipe();
                }
                if (this.checkCollision(birdPos, birdSize, topPipePos, topPipeSize) ||
                    this.checkCollision(birdPos, birdSize, downPipePos, downPipeSize))
                {
                    this.gameDeathMenu();
                }
            }
        },
        handlerBirdAnimation: function()
        {
            var imagePos = this._model.getBirdAnimationPos();
            if (imagePos.x == config._POS_BIRDS_IN_IMAGE.x * 2)
            {
                imagePos.x = 0;
            }
            else
            {
                imagePos.x += config._POS_BIRDS_IN_IMAGE.x * 2;
            }
            this._model.setBirdAnimationPos(imagePos);
        }
    });
});