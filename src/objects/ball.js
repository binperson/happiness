const woolNodes = 10,
    woolSegLength = 2,
    gravity = -.8,
    accuracy = 1;

class WoolVert {
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
  
    let nx = this.x + ((this.x - this.oldx) * .9) + this.fx;
    let ny = this.y + ((this.y - this.oldy) * .9) + this.fy;
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
class Ball {
  constructor () {

  }
  init () {
    var redMat = new THREE.MeshLambertMaterial({
      color: 0x630d15,
      flatShading: THREE.FlatShading
    });
  
    var stringMat = new THREE.LineBasicMaterial({
      color: 0x630d15,
      linewidth: 3
    });
  
    this.instance = new THREE.Group();
    this.ballRay = 8;
  
    this.verts = [];
  
    // string
    var stringGeom = new THREE.Geometry();
  
    for (var i = 0; i < woolNodes; i++) {
      var v = new THREE.Vector3(0, -i * woolSegLength, 0);
      stringGeom.vertices.push(v);
  
      var woolV = new WoolVert();
      woolV.x = woolV.oldx = v.x;
      woolV.y = woolV.oldy = v.y;
      woolV.z = 0;
      woolV.fx = woolV.fy = 0;
      woolV.isRootNode = (i == 0);
      woolV.vertex = v;
      if (i > 0) woolV.attach(this.verts[(i - 1)]);
      this.verts.push(woolV);
  
    }
    this.string = new THREE.Line(stringGeom, stringMat);
  
    // body
    var bodyGeom = new THREE.SphereGeometry(this.ballRay, 5, 4);
    this.body = new THREE.Mesh(bodyGeom, redMat);
    this.body.position.y = -woolSegLength * woolNodes;
  
    var wireGeom = new THREE.TorusGeometry(this.ballRay, .5, 3, 10, Math.PI * 2);
    this.wire1 = new THREE.Mesh(wireGeom, redMat);
    this.wire1.position.x = 1;
    this.wire1.rotation.x = -Math.PI / 4;
  
    this.wire2 = this.wire1.clone();
    this.wire2.position.y = 1;
    this.wire2.position.x = -1;
    this.wire1.rotation.x = -Math.PI / 4 + .5;
    this.wire1.rotation.y = -Math.PI / 6;
  
    this.wire3 = this.wire1.clone();
    this.wire3.rotation.x = -Math.PI / 2 + .3;
  
    this.wire4 = this.wire1.clone();
    this.wire4.position.x = -1;
    this.wire4.rotation.x = -Math.PI / 2 + .7;
  
    this.wire5 = this.wire1.clone();
    this.wire5.position.x = 2;
    this.wire5.rotation.x = -Math.PI / 2 + 1;
  
    this.wire6 = this.wire1.clone();
    this.wire6.position.x = 2;
    this.wire6.position.z = 1;
    this.wire6.rotation.x = 1;
  
    this.wire7 = this.wire1.clone();
    this.wire7.position.x = 1.5;
    this.wire7.rotation.x = 1.1;
  
    this.wire8 = this.wire1.clone();
    this.wire8.position.x = 1;
    this.wire8.rotation.x = 1.3;
  
    this.wire9 = this.wire1.clone();
    this.wire9.scale.set(1.2, 1.1, 1.1);
    this.wire9.rotation.z = Math.PI / 2;
    this.wire9.rotation.y = Math.PI / 2;
    this.wire9.position.y = 1;
  
    this.body.add(this.wire1);
    this.body.add(this.wire2);
    this.body.add(this.wire3);
    this.body.add(this.wire4);
    this.body.add(this.wire5);
    this.body.add(this.wire6);
    this.body.add(this.wire7);
    this.body.add(this.wire8);
    this.body.add(this.wire9);
  
    this.instance.add(this.string);
    this.instance.add(this.body);
  
    this.instance.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
  update (posX, posY, posZ) {
    var i = accuracy;

    while (i--) {

      var nodesCount = woolNodes;

      while (nodesCount--) {

        var v = this.verts[nodesCount];

        if (v.isRootNode) {
          v.x = posX;
          v.y = posY;
          v.z = posZ;
        }

        else {

          var constraintsCount = v.constraints.length;

          while (constraintsCount--) {

            var c = v.constraints[constraintsCount];

            var diff_x = c.p1.x - c.p2.x,
              diff_y = c.p1.y - c.p2.y,
              dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
              diff = (c.length - dist) / dist;

            var px = diff_x * diff * .5;
            var py = diff_y * diff * .5;

            c.p1.x += px;
            c.p1.y += py;
            c.p2.x -= px;
            c.p2.y -= py;
            c.p1.z = c.p2.z = posZ;
          }

          if (nodesCount == woolNodes - 1) {
            this.body.position.x = this.verts[nodesCount].x;
            this.body.position.y = this.verts[nodesCount].y;
            this.body.position.z = this.verts[nodesCount].z;

            this.body.rotation.z += (v.y <= this.ballRay) ? (v.oldx - v.x) / 10 : Math.min(Math.max(diff_x / 2, -.1), .1);
          }
        }

        if (v.y < this.ballRay) {
          v.y = this.ballRay;
        }
      }
    }

    nodesCount = woolNodes;
    while (nodesCount--) this.verts[nodesCount].update();

    this.string.geometry.verticesNeedUpdate = true;
  }
  receivePower (tp) {
    this.verts[woolNodes - 1].add_force(tp.x, tp.y);
  }
}

export default new Ball()