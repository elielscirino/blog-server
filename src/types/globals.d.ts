import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { Query } from 'pg'

export type AuthUser = {
  id: string
  role: string
}

export interface AppRequest<
  P = ParamsDictionary,
  B = any,
  Q = Query,
> extends Request<P, null, B, Q> {
  user?: AuthUser;
}

type whereType = [
  condition: string,
  value?: string | number | string[] | number[]
]

export type ReadOptions<T> = {
  columns: Array<keyof T | {[key: string]: string}>,
  where?: whereType[]
}

