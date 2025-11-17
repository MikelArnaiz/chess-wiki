import { useEffect, useState } from 'react'
import { formatDiffDatesToNow } from '../../utils/date'

type TimeSinceProps = {
  since: number
}

export const TimeSince = (props: TimeSinceProps) => {
  const [timeFormatted, setTimeFormatted] = useState<string>()

  useEffect(() => {
    const diff = formatDiffDatesToNow(props.since)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeFormatted(diff)

    const id = setInterval(() => {
      const diff = formatDiffDatesToNow(props.since)
      setTimeFormatted(diff)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [props.since])

  if (timeFormatted) {
    return timeFormatted
  }
}
