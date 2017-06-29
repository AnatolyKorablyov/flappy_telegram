goog.provide("ispring.sample.GameModel");

goog.require("ispring.sample.Definition");
goog.require("ispring.sample.Bird");
goog.require("ispring.sample.Pipe");

goog.scope(function() {
    /**
     * @constructor
     */
    const GAME_CONFIG = ispring.sample.Definition;
    const config = new GAME_CONFIG();
    const Bird = ispring.sample.Bird;
    const Pipe = ispring.sample.Pipe;

    const Point = goog.math.Coordinate;
    const Size = goog.math.Size;
    
    ispring.sample.GameModel = goog.defineClass(null, {
        constructor: function () {
            /**
             *
             * @type {boolean}
             * @private
             */
            this._newGame = true;

            /**
             *
             * @type {Array}
             * @private
             */
            this._pipesArray = [];
            this.resetData();
        },
        addPipe: function()
        {
            this._pipesArray.push(new Pipe(config._PIPE_POS_X + config._PIPES_DISTANCE * this._pipesArray.length));
        },
        deletePipe: function(numId)
        {
            this._pipesArray[numId].deletePipe();
            this._pipesArray.splice(numId, 1);
        },
        resetData: function()
        {
            if (!this._newGame)
            {
                this.deleteBackground();
                this.deleteSounds();
                this._bird.deleteBird();
                for (var j =  this.getPipeArrayLength() - 1; j >= 0; --j)
                {
                    this.deletePipe(j);
                }
            }
            this.setBackground();
            this.initSounds();
            this.stopSounds();
            /**
             *
             * @type {ispring.sample.Bird}
             * @private
             */
            this._bird = new Bird();
            /**
             *
             * @type {goog.math.Coordinate}
             * @private
             */
            this._birdAnimationPos = new Point(0, 0);
            for (var i = 0; i < config._NUMBER_PIPES; ++i)
            {
                this.addPipe();
            }
            
            /**
             *
             * @type {number}
             * @private
             */
            this._score = 0;
            /**
             *
             * @type {boolean}
             * @private
             */
            this._newGame = false;

        },
        initSounds: function()
        {
            /**
             * 
             * @type {Audio}
             * @private
             */
            this._audioFlyBird = new Audio();
            this._audioFlyBird.src = config._PATH_TO_SOUNDS + config._SOUND_WING;
            /**
             *
             * @type {Audio}
             * @private
             */
            this._audioTakePoint = new Audio();
            this._audioTakePoint.src = config._PATH_TO_SOUNDS + config._SOUND_POINT;
            /**
             *
             * @type {Audio}
             * @private
             */
            this._audioBirdDie = new Audio();
            this._audioBirdDie.src = config._PATH_TO_SOUNDS + config._SOUND_DIE;
            /**
             *
             * @type {Audio}
             * @private
             */
            this._soundtrack = new Audio();
            this._soundtrack.src = config._PATH_TO_SOUNDS + config._GAME_MUSIC;
            
            this.stopSounds();
        },
        stopSounds: function()
        {
            this._audioFlyBird.load();
            this._audioTakePoint.load();
            this._audioBirdDie.load();
            this._soundtrack.load();
        },
        playAudioFlyBird: function()
        {
            this._audioFlyBird.load();
            this._audioFlyBird.play();
        },
        playAudioTakePoint: function()
        {
            this._audioTakePoint.load();
            this._audioTakePoint.play();
        },
        playAudioBirdDie: function()
        {
            this._audioBirdDie.load();
            this._audioBirdDie.play();
        },
        playSoundtrack: function()
        {
            this._soundtrack.load();
            this._soundtrack.play();
        },
        deleteSounds: function()
        {
            /**
             * 
             * @type {null}
             * @private
             */
            this._audioFlyBird = null;
            /**
             * 
             * @type {null}
             * @private
             */
            this._audioTakePoint = null;
            /**
             * 
             * @type {null}
             * @private
             */
            this._audioBirdDie = null;
            /**
             * 
             * @type {null}
             * @private
             */
            this._soundtrack = null;
        },
        setBackground: function()
        {
            /**
             *
             * @type {Image}
             * @private
             */
            this._background = new Image();
            this._background.src = config._PATH_TO_IMAGES + config._BACKGROUND_FILE_NAME;  
        },
        deleteBackground: function()
        {
            /**
             * 
             * @type {null}
             * @private
             */
            this._background = null;
        },
        getBackgroundImage: function()
        {
            return this._background;
        },
        getBirdImage: function()
        {
            return this._bird.getImage();
        },
        getBirdPosition: function()
        {
            return this._bird.getPosition();
        },
        getBirdSize: function()
        {
            return this._bird.getSize();
        },
        setBirdAnimationPos: function(imagePos)
        {
            this._birdAnimationPos = imagePos;
        },
        getBirdAnimationPos: function()
        {
            return this._birdAnimationPos;
        },
        moveObjects: function()
        {
            this.fallBird();
            this.movePipe();
        },
        flyBird: function()
        {
            this._bird.takeoffSpeed();
            this._bird.setPositionOfTheSpeed();
        },
        getPipeArrayLength: function()
        {
            return this._pipesArray.length;
        },
        getPipeImage: function(numId)
        {
            return this._pipesArray[numId].getImage();
        },
        getPipePosition: function(numId)
        {
            return this._pipesArray[numId].getPosition();
        },
        getPipeSize: function(numId)
        {
            return this._pipesArray[numId].getSize();
        },
        getPipePassage: function(numId)
        {
            return this._pipesArray[numId].getPassage();
        },
        setPipePassage: function(numId)
        {
            this._pipesArray[numId].truePassage();
        },
        incScore: function()
        {
            this._score++;
        },
        getScore: function()
        {
            return this._score;
        },


        fallBird: function()
        {
            this._bird.incSpeed();
            this._bird.setPositionOfTheSpeed();
        },
        movePipe: function()
        {
            for (var i = 0; i < this._pipesArray.length; ++i)
            {
                this._pipesArray[i].decPosition();
            }
        }
    });
});