import { FC } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaVimeo, FaLinkedinIn } from 'react-icons/fa'
import { useLanguage } from '@/app/LanguageContext'
import Footer from './Footer'

type HambergerProps = {
  open: boolean
  id: string
  close: () => void
}
const HambergerMenu: FC<HambergerProps> = ({ open, id, close }) => {
  const handleClick = () => {
    close()
  }
  const [showFilmList, setShowFilmList] = useState(false)
  const { isEnglish, toggleLanguage } = useLanguage()
  const handleClickList = () => {
    setShowFilmList(!showFilmList)
  }
  const handleLanguageChange = async () => {
    toggleLanguage()
  }
  return (
    <nav
      id={id}
      aria-hidden={!open}
      className={`relative ${styles.HambergerMenu}`}
    >
      <div>
        <Link href={'/'} onClick={handleClick}>
          <h1 className={styles.NavbarTitleSmall}>
            impermanence
            <br />
            films
          </h1>
        </Link>
        <div>
          <button
            onClick={handleLanguageChange}
            className="second-btn absolute top-32 right-10"
          >
            {isEnglish ? ' FR' : 'EN'}
          </button>
        </div>
        <div className="mt-24">
          <ul className={styles.MenuOpen}>
            <li>
              <Link href={'/news'} onClick={handleClick}>
                news
              </Link>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <p>films</p>
                <button onClick={handleClickList}>
                  {showFilmList ? (
                    <span className="font-style-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>

              {showFilmList && (
                <ul className={styles.showFilmList}>
                  <li>
                    <Link
                      href={
                        isEnglish
                          ? '/en/categories/en%20cours'
                          : '/categories/en%20cours'
                      }
                      onClick={handleClick}
                    >
                      {isEnglish ? 'en cours' : 'in progress'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        isEnglish
                          ? '/en/categories/production'
                          : '/categories/production'
                      }
                      onClick={handleClick}
                    >
                      production
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        isEnglish
                          ? '/en/categories/distribution'
                          : '/categories/distribution'
                      }
                      onClick={handleClick}
                    >
                      distribution
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        isEnglish
                          ? '/en/categories/programmation'
                          : '/categories/programmation'
                      }
                      onClick={handleClick}
                    >
                      programmation
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href={isEnglish ? '/en/about' : '/about'}
                onClick={handleClick}
              >
                {isEnglish ? 'à propos' : 'about'}
              </Link>
            </li>
            <li>
              <Link
                href={isEnglish ? '/en/contact' : '/contact'}
                onClick={handleClick}
              >
                contact
              </Link>
            </li>
            <li className="text-red-700 flex justify-end items-center gap-3">
              <span>
                <Link href="https://vimeo.com/user9555000" target="_blank">
                  <FaVimeo />
                </Link>
              </span>
              <span>
                <Link
                  href="https://www.linkedin.com/company/impermanence-films/"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </Link>
              </span>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </nav>
  )
}

export default HambergerMenu
