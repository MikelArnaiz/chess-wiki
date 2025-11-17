import { useEffect, useState } from 'react'
import { fetchGrandmasters } from '../../api/fetchGrandmasters'
import { Link } from 'react-router-dom'
import { getUserPagePath } from '../../utils/path'

export const HomePage = () => {
  const [users, setUsers] = useState<string[] | null>()

  useEffect(() => {
    async function getGrandmasters() {
      const results = await fetchGrandmasters()
      setUsers(results?.players ?? null)
    }

    getGrandmasters()
  }, [])

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
