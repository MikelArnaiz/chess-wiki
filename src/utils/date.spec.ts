import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach,
  afterAll,
} from 'vitest'
import { formatDiffDatesToNow } from './date'

describe('formatDiffDatesToNow', () => {
  const FIXED_NOW_DATE = new Date('2025-10-25T08:30:20Z').valueOf()
  let previousTZ: string | undefined

  beforeEach(() => {
    previousTZ = process.env.TZ
    process.env.TZ = 'UTC'
    vi.setSystemTime(FIXED_NOW_DATE)
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  afterAll(() => {
    if (previousTZ === undefined) {
      delete process.env.TZ
    } else {
      process.env.TZ = previousTZ
    }
  })

  it('formats zero difference when the dates are the same', () => {
    const result = formatDiffDatesToNow(FIXED_NOW_DATE)
    expect(result).toBe('00:00:00')
  })

  it('formats time difference when the dates are different', () => {
    const PAST_DATE = new Date('2025-10-25T06:20:15Z').valueOf()
    const result = formatDiffDatesToNow(PAST_DATE)
    expect(result).toBe('02:10:05')
  })

  it('formats more than 24h time difference', () => {
    const PAST_DATE = new Date('2025-10-23T07:29:15Z').valueOf()
    const result = formatDiffDatesToNow(PAST_DATE)
    expect(result).toBe('49:01:05')
  })
})
