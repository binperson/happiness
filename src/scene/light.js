class Light {
  constructor () {
    this.instances = {}
  }

  init () {
    const globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
    
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9)
    shadowLight.position.set(200, 200, 200);
    shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

    const backLight = new THREE.DirectionalLight(0xffffff, .4)
    backLight.position.set(-100, 100, 100);
    backLight.castShadow = true;
    backLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

    this.instances.shadowLight = globalLight
    this.instances.ambientLight = shadowLight
    this.instances.shadowTarget = backLight
  }
}

export default new Light()