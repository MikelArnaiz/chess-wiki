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
import classNames from 'classnames'

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
    const skeletonElements = new Array(50).fill(null)

    return (
      <div>
        <ul className={styles.list}>
          {skeletonElements.map((_item, index) => {
            return (
              <li
                key={index}
                className={classNames(styles.item, styles.loading)}
              >
                &nbsp;
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const users = usersList.data

  return (
    <div>
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
