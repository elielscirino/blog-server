import { Router as ExpressRouter } from 'express'

export default abstract class Router {
  public router: ExpressRouter

  constructor() {
    this.router = ExpressRouter()
    this.initialize()
  }

  abstract initialize(): void
}