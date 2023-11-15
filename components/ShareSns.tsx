import { TNews } from '@/types'
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
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'
import styles from './styles.module.css'

interface ShareSnsProps {
  _id: string
}

const ShareSns = ({ _id }: ShareSnsProps) => {
  return (
    <div className={styles.Icons}>
      <FacebookShareButton url={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
        <FaFacebook size={16} color="#c4010a" />
      </FacebookShareButton>
      <TwitterShareButton url={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
        <FaXTwitter size={16} color="#c4010a" />
      </TwitterShareButton>
      <WhatsappShareButton url={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
        <FaWhatsapp size={16} color="#c4010a" />
      </WhatsappShareButton>
      <LinkedinShareButton url={`${process.env.NEXTAUTH_URL}/news/${_id}`}>
        <FaLinkedinIn ssize={16} color="#c4010a" />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareSns
