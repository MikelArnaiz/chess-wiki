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
      Players list:
      {!!users?.length && (
        <ul>
          {users.map((username) => (
            <li key={username}>
              <Link to={getUserPagePath(username)}>{username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
