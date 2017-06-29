goog.provide("Sample");

goog.require("ispring.sample.GameController");

/**
 * @export
 */
Sample.start = function()
{
	var myGame = ispring.sample.GameController;
	var canvas = document.querySelector("canvas");
	var game = new myGame(canvas);
};
