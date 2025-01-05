import Router from './abstracts/router'
import userRouter from './modules/user/user.routes'

class AppRouter extends Router {
  initialize() {
    this.router.use('/user', userRouter)
  }
}

export default new AppRouter().router