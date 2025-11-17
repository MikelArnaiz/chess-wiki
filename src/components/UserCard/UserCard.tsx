import { format } from 'date-fns'
import type { PlayerJSON } from '../../api/fetchUsername'
import styles from './UserCard.module.scss'

type UserCardProps = {
  data: PlayerJSON
}

export const UserCard = ({ data }: UserCardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={data.avatar} alt="Player avatar" />
      <div>
        <h3>
          {data.name}
          {data.title && <span className={styles.title}>{data.title}</span>}
        </h3>
        <div className={styles.username}>{data.username}</div>
        <div>{data.league} league</div>
        <div>{data.followers} followers</div>
        {data.location && <div>{data.location}</div>}
        {data.last_online && (
          <div>Last online: {new Date(data.last_online).toISOString()}</div>
        )}
        <div>User since {format(data.joined, 'y')}</div>
      </div>
    </div>
  )
}
