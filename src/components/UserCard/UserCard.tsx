import type { PlayerJSON } from '../../api/fetchUsername'
import styles from './UserCard.module.scss'
import { TimeSince } from '../TimeSince/TimeSince'

type UserCardProps = {
  data: PlayerJSON
}

export const UserCard = ({ data }: UserCardProps) => {
  return (
    <div className={styles.card}>
      {data.avatar && (
        <img
          width={200}
          height={200}
          className={styles.avatar}
          src={data.avatar}
          alt="Player avatar"
        />
      )}
      <div>
        <h3>
          {data.name ?? data.username}
          {data.title && <span className={styles.title}>{data.title}</span>}
        </h3>
        {/* If name doesn't exist we show the name in the heading, and hide it here */}
        {data.name && <div className={styles.username}>{data.username}</div>}
        <div>{data.league} league</div>
        <div>{data.followers} followers</div>
        {data.location && <div>{data.location}</div>}
        <div>
          Time last online: <TimeSince since={data.last_online} />
        </div>
        <div>User since {new Date(data.joined).getFullYear()}</div>
      </div>
    </div>
  )
}
