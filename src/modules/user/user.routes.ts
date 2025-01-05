import Router from '../../abstracts/router'
import userController from './user.controller'
import userValidator from './user.validator'

class UserRouter extends Router {
  initialize() {
    this.router.post('/register', userValidator.validate, userController.register)
    this.router.post('/login', userController.login)
  }
}

export default new UserRouter().router
