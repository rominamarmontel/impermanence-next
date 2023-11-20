import Image from 'next/image'
import Link from 'next/link'
import { TFilm } from '@/types/index'
import styles from './styles.module.css'
import { useLanguage } from '@/app/LanguageContext'
import React from 'react'

const FilmEnglish: React.FC<TFilm> = ({
  _id,
  category,
  title,
  directedBy,
  imageData,
  originalTitle,
}: TFilm) => {
  const { isEnglish } = useLanguage()
  const getCategoryDisplayName = (catName: string) => {
    return isEnglish && catName === 'en cours' ? 'in progress' : catName
  }
  return (
    <div className="lg:w-[32%] md:w-[49%] sm:w-full">
      <Link href={`${process.env.NEXTAUTH_URL}/en/film/${_id}`}>
        <div style={{ position: 'relative' }} className="w-full aspect-video">
          {imageData && imageData.length > 0 && (
            <Image
              src={imageData[0].url}
              alt={originalTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
              className="object-cover object-center"
              priority
            />
          )}
        </div>

        <div className="mt-4">
          {title && (
            <div className={styles.Title}>
              {title.en && <div>{title.en.toUpperCase()}</div>}
            </div>
          )}
          <div className={styles.DirectedBy}>
            {directedBy && <div>by {directedBy}</div>}
          </div>
        </div>
      </Link>
      {category && (
        <Link href={`categories/${getCategoryDisplayName(category.catName)}`}>
          <span className={`${styles.CatName}`}>
            {getCategoryDisplayName(category.catName).toUpperCase()}
          </span>
        </Link>
      )}
    </div>
  )
}

export default FilmEnglish
