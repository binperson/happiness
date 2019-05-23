import sceneConf from '../../confs/scene-conf'
import camera from './camera'
import light from './light'

class Scene {
  constructor () {
  }

  init () {
    this.instance = new THREE.Scene()
    const renderer = this.renderer = new THREE.WebGLRenderer(
      { antialias: true, //抗锯齿
        canvas: canvas,
        antialias: true
      }
    )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    // renderer.setClearColor(sceneConf.backgroundColor)
    this.camera = camera
    this.camera.init()
    this.light = light
    this.light.init()
    // this.axesHelper = new THREE.AxesHelper(1000)
    // this.instance.add(this.axesHelper)

    for (let lightType in this.light.instances) {
      this.instance.add(this.light.instances[lightType])
    }
    this.instance.add(this.camera.instance)
  }
  render () {
    this.renderer.render(this.instance, this.camera.instance)
  }
}

export default new Scene()