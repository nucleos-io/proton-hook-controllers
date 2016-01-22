'use strict'

let path = require('path')
let Hook = require('proton-hook')
let _ = require('lodash')

module.exports = class ControllersHook extends Hook {

  constructor(proton) {
    super(proton)
  }

  configure() {
    if (!this.proton.app.controllers)
      this.proton.app.controllers = {}
    return true
  }

  initialize() {
    let controllersPath = path.join(this.proton.app.path, '/controllers')
    let controllers = require('require-all')(controllersPath)
    _.forEach(controllers, Controller => new Controller(this.proton))
  }

}
