class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  dist(v) {
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  setMagnitude(magnitude) {
    var angle = this.angle();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
    return this;
  }
  limit(l) {
    if (this.magnitude() > l) {
      this.setMagnitude(l);
    }
    return this;
  }
  multiply(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  copy() {
    return new Vector(this.x, this.y);
  }
  angleBetween(v) {
    return this.angle() - v.angle();
    //   return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  lerp(v, amt) {
    this.x += (v.x - this.x) * amt;
    this.y += (v.y - this.y) * amt;
    return this;
  }
}

export default Vector;
