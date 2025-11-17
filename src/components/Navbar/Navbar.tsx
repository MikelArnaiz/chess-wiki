import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
    </nav>
  )
}
