'use client'

import { TNews } from '@/types'
import Image from 'next/image'
import React from 'react'
import ShareSns from './ShareSns'
import styles from './styles.module.css'

const OneNews = ({ _id, postTitle, post, imageUrl, updatedAt }: TNews) => {
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
    <>
      <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8">
        <div>
          <div className={`mb-5 ${styles.PostTitle}`}>{postTitle}</div>
        </div>
        <div style={{ position: 'relative' }} className="w-full aspect-video">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={postTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
              className="object-cover object-center"
              priority
            />
          )}
        </div>
        <div className="textp my-10">{post}</div>
        <div className="textSm flex justify-end items-baseline gap-5">
          <div>
            <span>posted @ </span>
            {formattedDate}
          </div>
          <ShareSns _id={_id} />
        </div>
      </div>
    </>
  )
}

export default OneNews
