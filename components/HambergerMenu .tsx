import { FC } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

type HambergerProps = {
  open: boolean
  id: string
  close: () => void
}
const HambergerMenu: FC<HambergerProps> = ({ open, id, close }) => {
  const handleClick = () => {
    close()
  }
  return (
    <nav id={id} aria-hidden={!open} className={styles.HambergerMenu}>
      <div>
        <Link href={'/'} onClick={handleClick}>
          <h1 className={styles.NavbarTitleSmall}>
            impermanence
            <br />
            films
          </h1>
        </Link>
        <ul>
          <li>
            <Link href={'/news'} onClick={handleClick}>
              news
            </Link>
          </li>
          <li>
            <Link href={'/categories/en%20cours'} onClick={handleClick}>
              en cours
            </Link>
          </li>
          <li>
            <Link href={'/categories/production'} onClick={handleClick}>
              production
            </Link>
          </li>
          <li>
            <Link href={'/categories/distribution'} onClick={handleClick}>
              distribution
            </Link>
          </li>
          <li>
            <Link href={'/categories/programmation'} onClick={handleClick}>
              programmation
            </Link>
          </li>
          <li>
            <Link href={'/about'} onClick={handleClick}>
              à propos
            </Link>
          </li>
          <li>
            <Link href={'/contact'} onClick={handleClick}>
              contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HambergerMenu
