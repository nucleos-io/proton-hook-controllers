'use strict'

const path = require('path')
const Quark = require('proton-quark')
const _ = require('lodash')
const controllersPath = path.join(this.proton.app.path, '/controllers')


/**
 * @class ControllersQuark
 * @classdesc This quark is for instance controllers
 * @author Luis Hernandez
 */
class ControllersQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  /**
   * @override
   * @method validate
   * @description Ask if the proton.app.controllers object exist, if not exist
   * the method create the proton.app.controllers object
   * @author Luis Hernandez
   */
  configure() {
    if (!this.proton.app.controllers) {
      this.proton.app.controllers = {}
    }
  }

  /**
   * @override
   * @method initialize
   * @description instance all controllers of the app
   * @author Luis Hernandez
   */
  initialize() {
    _.forEach(controllers, (Controller, fileName) => {
      const controller = new Controller(this.proton)
      controller.fileName = fileName
      return controller
    })
  }

  /**
   * @method controllers
   * @description This method get the export value of each controller present
   * in the controllers folder
   * @author Luis Hernandez
   * @return {Array} - All controllers exported values as an array
   */
  get _controllers() {
    return require('require-all')(controllersPath)
  }

}

module.exports = ControllersQuark
