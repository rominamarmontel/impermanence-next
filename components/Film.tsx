import Image from 'next/image'
import Link from 'next/link'
import { TFilm } from '@/types/index'
import styles from './styles.module.css'

const Film = ({ _id, category, title, directedBy, imageData }: TFilm) => {
  return (
    <div className="lg:w-[32%] md:w-[49%] sm:w-full">
      <Link href={`http://localhost:3000/film/${_id}`}>
        <div className="w-full aspect-video relative">
          {imageData && imageData.length > 0 && (
            <Image
              src={imageData[0].url}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
              className="object-cover object-center"
              priority
            />
          )}
        </div>

        <div className="mt-4">
          {title && <div className={styles.Title}>{title.toUpperCase()}</div>}
          <div className={styles.DirectedBy}>
            {directedBy && /^[aeiou\u0153]/i.test(directedBy)
              ? `d'${directedBy}`
              : `de ${directedBy}`}
          </div>
        </div>
      </Link>
      {category && (
        <Link href={`categories/${category.catName}`}>
          <span className={`${styles.CatName}`}>
            {category.catName.toUpperCase()}
          </span>
        </Link>
      )}
    </div>
  )
}

export default Film
