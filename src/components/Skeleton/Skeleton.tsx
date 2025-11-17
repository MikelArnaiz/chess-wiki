import styles from './Skeleton.module.scss'
import classNames from 'classnames'

type SkeletonProps = {
  withBg?: boolean
  fullHeight?: boolean
}
export const Skeleton = ({ withBg, fullHeight }: SkeletonProps) => {
  return (
    <div className={styles.skeleton}>
      <div
        className={classNames(styles.inner, {
          [styles.withBg]: withBg,
          [styles.fullHeight]: fullHeight,
        })}
      >
        &nbsp;
      </div>
    </div>
  )
}
