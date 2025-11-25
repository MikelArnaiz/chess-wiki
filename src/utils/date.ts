export function formatDiffDatesToNow(value: number) {
  const now = Date.now()
  const diffMs = now - value
  const diffSec = diffMs / 1000
  const hours = Math.floor(diffSec / 3600)
  const minutes = Math.floor((diffSec % 3600) / 60)
  const seconds = Math.floor(diffSec % 60)

  return [hours, minutes, seconds]
    .map((v) => {
      return String(v).padStart(2, '0')
    })
    .join(':')
}
