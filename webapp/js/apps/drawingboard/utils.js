
var isColor = function(string) {
	if (!string || !string.length) return false;
	return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(string) || $.inArray(string.substring(0, 3), ['rgb', 'hsl']) !== -1;
};

/**
 * Packs an RGB color into a single integer.
 */
var RGBToInt = function(r, g, b) {
	var c = 0;
	c |= (r & 255) << 16;
	c |= (g & 255) << 8;
	c |= (b & 255);
	return c;
};

/**
 * Returns informations on the pixel located at (x,y).
 */
var pixelAt = function(image, x, y) {
	var i = (y * image.width + x) * 4;
	var c = DrawingBoard.Utils.RGBToInt(
		image.data[i],
		image.data[i + 1],
		image.data[i + 2]
	);

	return [
		i, // INDEX
		x, // X
		y, // Y
		c  // COLOR
	];
};

/**
 * Compares two colors with the given tolerance (between 0 and 255).
 */
var compareColors = function(a, b, tolerance) {
	if (tolerance === 0) {
		return (a === b);
	}

	var ra = (a >> 16) & 255, rb = (b >> 16) & 255,
		ga = (a >> 8) & 255, gb = (b >> 8) & 255,
		ba = a & 255, bb = b & 255;

	return (Math.abs(ra - rb) <= tolerance)
		&& (Math.abs(ga - gb) <= tolerance)
		&& (Math.abs(ba - bb) <= tolerance);
};

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
}());

module.exports = {
  isColor: isColor,
  RGBToInt: RGBToInt,
  pixelAt: pixelAt,
  compareColors: compareColors
}
