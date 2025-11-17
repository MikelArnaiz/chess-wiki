import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  isIdleStatus,
  isLoadingStatus,
  loading,
  Status,
} from '../../utils/Status'
import { fetchPlayer } from '../../api/fetchUsername'
import { UserCard } from '../../components/UserCard/UserCard'
import styles from './UserPage.module.scss'
import { UsersContext } from '../../hooks/UsersContext'
import { UserCardSkeleton } from '../../components/UserCard/UserCardSkeleton'

export const UserPage = () => {
  const { username } = useParams<{ username: string }>()
  const { usersData, onSetUserData } = useContext(UsersContext)

  useEffect(() => {
    if (username && !usersData[username]) {
      onSetUserData(username, loading)
      fetchPlayer(username).then((value) => {
        onSetUserData(username, value)
      })
    }
  }, [onSetUserData, username, usersData])

  if (!username) {
    return null
  }

  const details = usersData[username]

  if (
    details === undefined ||
    isIdleStatus(details) ||
    isLoadingStatus(details)
  ) {
    return (
      <div className={styles.page}>
        <UserCardSkeleton />
      </div>
    )
  }

  if (details.kind === Status.Failure) {
    return <div>Error</div>
  }

  const { data } = details

  return (
    <div className={styles.page}>
      <UserCard data={data} />
    </div>
  )
}
