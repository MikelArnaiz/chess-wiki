import { useEffect, useState } from 'react'
import { fetchGrandmastersList } from '../../api/fetchGrandmasters'
import { Link } from 'react-router-dom'
import { getUserPagePath } from '../../utils/path'
import {
  idle,
  isFailureStatus,
  isSuccessStatus,
  Status,
} from '../../utils/Status'
import styles from './Home.module.scss'

export const HomePage = () => {
  const [usersList, setUsersList] = useState<Status<string[]>>(idle)

  useEffect(() => {
    async function getGrandmasters() {
      const results = await fetchGrandmastersList()
      setUsersList(results)
    }

    getGrandmasters()
  }, [])

  if (isFailureStatus(usersList)) {
    return <div>Error</div>
  }
  if (!isSuccessStatus(usersList)) {
    return <div>Loading...</div>
  }

  const users = usersList.data

  return (
    <div>
      <h3 className={styles.heading}>Players list</h3>
      {!!users?.length && (
        <ul className={styles.list}>
          {users.map((username) => (
            <li key={username} className={styles.item}>
              <Link to={getUserPagePath(username)} className={styles.link}>
                {username}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
