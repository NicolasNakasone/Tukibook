import styles from 'src/features/posts/PostSkeleton.module.css'

export const PostSkeleton = (): JSX.Element => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonAvatar} />
        <div className={styles.skeletonUsername} />
      </div>
      <div className={styles.skeletonContent} />
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonButton} />
      </div>
    </div>
  )
}
