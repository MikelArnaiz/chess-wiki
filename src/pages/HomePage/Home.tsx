import { useContext, useEffect } from 'react'
import { fetchGrandmastersList } from '../../api/fetchGrandmasters'
import { Link } from 'react-router-dom'
import { getUserPagePath } from '../../utils/path'
import {
  isFailureStatus,
  isIdleStatus,
  isSuccessStatus,
} from '../../utils/Status'
import styles from './Home.module.scss'
import classNames from 'classnames'
import { UsersContext } from '../../hooks/UsersContext'

export const HomePage = () => {
  const { usersList, onSetUsers } = useContext(UsersContext)

  useEffect(() => {
    async function getGrandmasters() {
      const results = await fetchGrandmastersList()
      onSetUsers(results)
    }

    if (isIdleStatus(usersList)) {
      getGrandmasters()
    }
  }, [onSetUsers, usersList])

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

  const { data } = usersList

  return (
    <div>
      {!!data?.length && (
        <ul className={styles.list}>
          {data.map((username) => (
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
