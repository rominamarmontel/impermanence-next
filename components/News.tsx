'use client'

import { TNews } from '@/types'
import Image from 'next/image'
import styles from './styles.module.css'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  GithubIcon,
  HatenaIcon,
  InstagramIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  MailruIcon,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  RedditIcon,
  RedditShareButton,
  SpotifyIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
} from 'next-share'

const News = ({ _id, postTitle, post, imageUrl, updatedAt }: TNews) => {
  const dateObject = new Date(updatedAt)
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  const formattedDate = dateObject.toLocaleDateString('fr-FR', options)

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="w-[50%] aspect-video relative">
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
        <div className="">
          {postTitle && <div className={styles.Title}>{postTitle}</div>}
          {post && <div className={styles.DirectedBy}>{post}</div>}
          {updatedAt && (
            <div>
              <span>updated @ </span>
              {formattedDate}
            </div>
          )}
          <div>
            <FacebookShareButton
              url={`${process.env.NEXTAUTH_URL}/api/news/${_id}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={`${process.env.NEXTAUTH_URL}/api/news/${_id}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`${process.env.NEXTAUTH_URL}/api/news/${_id}`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={`${process.env.NEXTAUTH_URL}/api/news/${_id}`}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
