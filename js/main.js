var width = 400;
var height = 400;
var paper = Raphael(document.getElementById('canvas'), width, height);

function enumerate () {
  var obj = {};
  for (var i = 0, l = arguments.length; i < l; i++) {
    obj[arguments[i]] = i;
  };
  return Object.freeze(obj);
}

function lerp (x0, y0, x1, y1) {
  return function (n) {
    return ((y1 - y0) / (x1 - x0)) * n;
  };
}

var DIRECTION = enumerate(
  'ALL',
  'N',
  'NE',
  'E',
  'SE',
  'S',
  'SW',
  'W',
  'NW'
);

var Bloblet = function (options) {
  this.direction = options.direction;
  this.depth = options.depth;
  switch (options.direction) {
    case DIRECTION.N:
      this.x = options.x;
      this.y = options.y - 1;
      break;
    case DIRECTION.NE:
      this.x = options.x + 1;
      this.y = options.y - 1;
      break;
    case DIRECTION.E:
      this.x = options.x + 1;
      this.y = options.y;
      break;
    case DIRECTION.SE:
      this.x = options.x + 1;
      this.y = options.y + 1;
      break;
    case DIRECTION.S:
      this.x = options.x;
      this.y = options.y + 1;
      break;
    case DIRECTION.SW:
      this.x = options.x - 1;
      this.y = options.y + 1;
      break;
    case DIRECTION.W:
      this.x = options.x - 1;
      this.y = options.y;
      break;
    case DIRECTION.NW:
      this.x = options.x - 1;
      this.y = options.y - 1;
      break;
    default:
      this.x = options.x;
      this.y = options.y;
      break;
  }
};
Bloblet.prototype = new Object;

var createBlob = function (options) {
  var data = new Array2D(options.maxHeight, options.maxWidth);
  var x = options.x;
  var y = options.y;
  var radius = options.radius;
  var lerpFunc = lerp(0, 0, radius, 0.5);
  
  var workQueue = [new Bloblet({
    direction: DIRECTION.ALL,
    depth: 1,
    x: x,
    y: y
  })];
  var node;
  var coords;
  var newDepth;
  var lerpRatio;
  
  function addWork (direction) {
    workQueue.push(new Bloblet({
      x: x,
      y: y,
      direction: direction,
      depth: newDepth
    }));
  }
  
  function willExpand () {
    return Mathex.percentTrue(0.5 - lerpRatio);
  }
  
  while (workQueue[0] !== undefined) {
    bloblet = workQueue.pop(0);
    data.set(bloblet.x, bloblet.y, bloblet);
    x = bloblet.x;
    y = bloblet.y;
    newDepth = bloblet.depth + 1;
    lerpRatio = lerpFunc(newDepth);
    switch (bloblet.direction) {
      case DIRECTION.N:
        if (willExpand())
          addWork(DIRECTION.NW);
        if (willExpand())
          addWork(DIRECTION.N);
        if (willExpand())
          addWork(DIRECTION.NE);
        break;
      case DIRECTION.NE:
        if (willExpand())
          addWork(DIRECTION.N);
        if (willExpand())
          addWork(DIRECTION.NE);
        if (willExpand())
          addWork(DIRECTION.E);
        break;
      case DIRECTION.E:
        if (willExpand())
          addWork(DIRECTION.NE);
        if (willExpand())
          addWork(DIRECTION.E);
        if (willExpand())
          addWork(DIRECTION.SE);
        break;
      case DIRECTION.SE:
        if (willExpand())
          addWork(DIRECTION.E);
        if (willExpand())
          addWork(DIRECTION.SE);
        if (willExpand())
          addWork(DIRECTION.S);
        break;
      case DIRECTION.S:
        if (willExpand())
          addWork(DIRECTION.SE);
        if (willExpand())
          addWork(DIRECTION.S);
        if (willExpand())
          addWork(DIRECTION.SW);
        break;
      case DIRECTION.SW:
        if (willExpand())
          addWork(DIRECTION.S);
        if (willExpand())
          addWork(DIRECTION.SW);
        if (willExpand())
          addWork(DIRECTION.W);
        break;
      case DIRECTION.W:
        if (willExpand())
          addWork(DIRECTION.SW);
        if (willExpand())
          addWork(DIRECTION.W);
        if (willExpand())
          addWork(DIRECTION.NW);
        break;
      case DIRECTION.NW:
        if (willExpand())
          addWork(DIRECTION.W);
        if (willExpand())
          addWork(DIRECTION.NW);
        if (willExpand())
          addWork(DIRECTION.N);
        break;
      case DIRECTION.ALL:
        if (willExpand())
          addWork(DIRECTION.N);
        if (willExpand())
          addWork(DIRECTION.NE);
        if (willExpand())
          addWork(DIRECTION.E);
        if (willExpand())
          addWork(DIRECTION.SE);
        if (willExpand())
          addWork(DIRECTION.S);
        if (willExpand())
          addWork(DIRECTION.SW);
        if (willExpand())
          addWork(DIRECTION.W);
        if (willExpand())
          addWork(DIRECTION.NW);
        break;
    }
  }
  
  return data;
};

var Engine = {};
Engine.map = [];

var drawMap = function () {
  var w = Engine.map.w;
  var h = Engine.map.h;
  var halfW = Math.floor(w / 2);
  var halfH = Math.floor(h / 2);
  Engine.map.forEach(function (bloblet, x, y) {
    if (bloblet !== undefined) {
      paper.rect(x * (width / w), y * (height / h), width / w, height / h)
      .attr({
        fill: (x === halfW && y === halfH) ? 'red': 'green'
      });
    }
  });
};

(function () {
  var time;
  var tick = function (timestamp) {
    var dt = 0;
    if (time !== undefined)
      dt = timestamp - time;
    time = timestamp;
    
    paper.clear();
    paper.rect(0, 0, width, height);
    drawMap();
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
})();