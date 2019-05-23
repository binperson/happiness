import * as THREE from '../libs/three.js'
window.THREE = THREE
import game from './game/game'
class Main {
  constructor() {

  }
  static init() {
    game.init()
  }
}

export default Main