export default class WoolVert {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.oldx = 0;
    this.oldy = 0;
    this.fx = 0;
    this.fy = 0;
    this.isRootNode = false;
    this.constraints = [];
    this.vertex = null;
  }
  update () {
    var wind = 0;//.1+Math.random()*.5;
    this.add_force(wind, gravity);
  
    nx = this.x + ((this.x - this.oldx) * .9) + this.fx;
    ny = this.y + ((this.y - this.oldy) * .9) + this.fy;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x = nx;
    this.y = ny;
  
    this.vertex.x = this.x;
    this.vertex.y = this.y;
    this.vertex.z = this.z;
  
    this.fy = this.fx = 0
  }
  attach (point) {
    this.constraints.push(new Constraint(this, point));
  }
  add_force (x, y) {
    this.fx += x;
    this.fy += y;
  }
}

class Constraint {
  constructor (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = woolSegLength
  }
}