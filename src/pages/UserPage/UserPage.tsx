import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { idle, loading, Status } from '../../utils/Status'
import { fetchPlayer, type PlayerJSON } from '../../api/fetchUsername'
import { UserCard } from '../../components/UserCard/UserCard'
import styles from './UserPage.module.scss'

export const UserPage = () => {
  const { username } = useParams<{ username: string }>()
  const [details, setDetails] = useState<Status<PlayerJSON>>(idle)

  useEffect(() => {
    if (username) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDetails(loading)
      fetchPlayer(username).then((value) => {
        setDetails(value)
      })
    }
  }, [username])

  if (details.kind === Status.Failure) {
    return <div>Error</div>
  }

  if (details.kind !== Status.Success) {
    return <div>Loading...</div>
  }

  const { data } = details

  return (
    <div className={styles.page}>
      <UserCard data={data} />
    </div>
  )
}
