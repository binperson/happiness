class Floor {
  constructor () {

  }
  init () {
    this.instance = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000), new THREE.MeshBasicMaterial({color: 0x6ecccc}));
    this.instance.rotation.x = -Math.PI/2;
    this.instance.position.y = 0;
    this.instance.receiveShadow = true;
  }
}

export default new Floor()