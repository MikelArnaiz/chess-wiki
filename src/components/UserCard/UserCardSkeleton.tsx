import { Skeleton } from '../Skeleton/Skeleton'
import styles from './UserCard.module.scss'

export const UserCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div style={{ width: 200, height: 200 }}>
        <Skeleton withBg fullHeight />
      </div>
      <div
        style={{
          width: 200,
        }}
      >
        <h3>
          <Skeleton withBg line />
        </h3>
        <Skeleton withBg line />
        <Skeleton withBg line />
        <Skeleton withBg line />
        <Skeleton withBg line />
        <Skeleton withBg line />
        <Skeleton withBg line />
      </div>
    </div>
  )
}
