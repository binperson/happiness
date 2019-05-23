import { scene } from '../scene/index'
import floor from '../objects/floor'
import cat from '../objects/cat'
import ball from '../objects/ball'
const ballWallDepth = 28
export default class GamePage {
  constructor (callbacks) {
    this.callbacks = callbacks
  }
  init () {
    this.mousePos = { x: 0, y: 0 }
    console.log('init')
    this.t = 0
    this.scene = scene
    this.floor = floor
    this.cat = cat
    this.ball = ball

    this.scene.init()
    this.floor.init()
    this.cat.init()
    this.ball.init()

    this.addFloor()
    this.addCat()
    this.addBall()
    this.render()
    this.bindTouchEvent()
  }
  render () {
    this.scene.render()
    this.t+=.05
    this.cat.updateTail(this.t)

    var ballPos = this.getBallPos();
    this.ball.update(ballPos.x, ballPos.y, ballPos.z)

    this.ball.receivePower(this.cat.transferPower);
    this.cat.interactWithBall(this.ball.body.position)
    requestAnimationFrame(this.render.bind(this))
  }
  addFloor () {
    this.scene.instance.add(this.floor.instance)
  }
  addCat () {
    this.scene.instance.add(this.cat.instance)
  }
  addBall () {
    this.scene.instance.add(this.ball.instance)
  }
  bindTouchEvent () {
    canvas.addEventListener('touchmove', this.touchMoveCallback)
  }
  touchMoveCallback = (event) => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      this.mousePos = { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY };
    }
  }
  getBallPos () {
    var vector = new THREE.Vector3();

    vector.set(
      (this.mousePos.x / window.innerWidth) * 2 - 1,
      - (this.mousePos.y / window.innerHeight) * 2 + 1,
      0.1);
    console.log(this.mousePos)
    vector.unproject(this.scene.camera.instance);
    var dir = vector.sub(this.scene.camera.instance.position).normalize();
    
    var distance = (ballWallDepth - this.scene.camera.instance.position.z) / dir.z;
    var pos = this.scene.camera.instance.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  }
  show () {
  }
  hide () {
  }
  restart () {
    console.log('game page restart')
  }
}