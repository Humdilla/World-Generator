var Array2D = function (w, h) {
  Array.call(this, w);
  for (var i = 0; i < w; i++) {
    this[i] = new Array(h);
  }
  this.w = w;
  this.h = h;
};
Array2D.prototype = new Array;
Array2D.prototype.forEach = function (cb) {
  for (var i = 0; i < this.w; i++) {
    for (var j = 0; j < this.h; j++) {
      cb(this[i][j], i, j);
    }
  }
};
Array2D.prototype.set = function (x, y, val) {
  if (x < 0) x = this.w - Math.abs(x % this.w);
  else if (x >= this.w) x %= this.w;
  if (y < 0) y = this.h - Math.abs(y % this.h);
  else if (y >= this.h) y %= this.h;
  this[x][y] = val;
};
Array2D.prototype.get = function (x, y) {
  if (x < 0) x = this.w - x % this.w;
  else if (x >= this.w) x %= this.w;
  if (y < 0) y = this.h - y % this.h;
  else if (y >= this.h) y %= this.h;
  return this[x][y];
};
Array2D.prototype.setArea = function (x, y, w, h, cb) {
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      this[i][j] = cb();
    }
  }
};