import sceneConf from '../../confs/scene-conf'

class Camera {
  constructor () {
    this.instance = null
  }

  init () {
    const aspect = window.innerWidth/window.innerHeight
    console.log(aspect, aspect)
    const fieldOfView = 50;
    const nearPlane = 1;
    const farPlane = 2000;
    this.instance = new THREE.PerspectiveCamera(
      fieldOfView,
      aspect,
      nearPlane,
      farPlane
    );
    this.instance.position.set(0, 400, 250)
    this.target = new THREE.Vector3(0, 60, 0)
    this.instance.lookAt(this.target)
  }

  reset () {
    this.instance.position.set(0, 300, 250)
    this.target = new THREE.Vector3(0, 60, 0)
  }
}

export default new Camera()