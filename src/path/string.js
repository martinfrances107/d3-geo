export default function PathString() {
  this._string = [];
}

const POINT_STATE = {
  LineAtStart: 'LINE_AT_START',
  LineInProgress: 'LINE_IN_PROGRESS',
  NotInLine: 'NOT_IN_LINE'
};

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = false;
  },
  polygonEnd: function() {
    this._line = true;
  },
  lineStart: function() {
    this._point = POINT_STATE.LineAtStart;
  },
  lineEnd: function() {
    if (!this._line) this._string.push("Z");
    this._point = POINT_STATE.NotInLine;
  },
  point: function(x, y) {
    switch (this._point) {
      case POINT_STATE.LineAtStart: {
        this._string.push("M", x, ",", y);
        this._point = POINT_STATE.LineInProgress;
        break;
      }
      case POINT_STATE.LineInProgress: {
        this._string.push("L", x, ",", y);
        break;
      }
      case POINT_STATE.NotInLine:
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}
