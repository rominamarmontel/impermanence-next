'use client'

import { TNews } from '@/types'
import Image from 'next/image'
import styles from './styles.module.css'
import ShareSns from './ShareSns'
import Link from 'next/link'

const NewsEnglish = ({ _id, postTitle, post, imageUrl, updatedAt }: TNews) => {
  const dateObject = new Date(updatedAt)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  const formattedDate = dateObject.toLocaleDateString('fr-FR', options)

  return (
    <div className="w-full py-10">
      <div className="flex gap-5">
        <div style={{ position: 'relative' }} className="w-1/2 aspect-video">
          {imageUrl && (
            <Link href={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
              <Image
                src={imageUrl}
                alt={postTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className="object-cover object-center"
                priority
              />
            </Link>
          )}
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <Link href={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
            {postTitle && <div className={styles.NewsTitle}>{postTitle}</div>}
            {post && (
              <div className="text-base font-light line-clamp-2">{post}</div>
            )}
          </Link>
          <div className="flex flex-col gap-2">
            {updatedAt && (
              <div className="textXs underline pb-2">
                <span className="">updated @ </span>
                {formattedDate}
              </div>
            )}
            <ShareSns _id={_id} />
          </div>
        </div>
      </div>
    </div>
  )
}
NewsEnglish.displayName = 'NewsEnglish'
export default NewsEnglish
