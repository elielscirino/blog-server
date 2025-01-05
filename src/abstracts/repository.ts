import { Pool } from 'pg'
import { ReadOptions } from '../types/globals'

export default abstract class Repository {
  protected pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  protected formatData(data: Record<string, any>) {
    const columns = Object.keys(data).map((column) => `"${column}"`)
    const placeholders = columns.map((_, i) => `$${i + 1}`)
    const values = Object.values(data)

    return { columns, placeholders, values }
  }

  protected formatRead(opt: ReadOptions<any>) {
    const { columns: cols, where } = opt

    const columns = cols.map((column) => `"${String(column)}"`)
    const conditions = where?.map(([condition, _]) => condition).join(' AND ')
    const values = where?.map(([_, value]) => value) ?? []

    return { columns, conditions, values }

  }
}
