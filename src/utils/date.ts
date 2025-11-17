import { format } from 'date-fns'

export function formatDiffDatesToNow(value: number) {
  const now = new Date().valueOf()
  const diff = now - value
  return format(diff, 'HH:mm:ss')
}
