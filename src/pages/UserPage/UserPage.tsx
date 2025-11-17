import { useParams } from 'react-router-dom'

export const UserPage = () => {
  const { username } = useParams<{ username: string }>()

  return (
    <div>
      <h2>User page</h2>
      Username: {username}
    </div>
  )
}
