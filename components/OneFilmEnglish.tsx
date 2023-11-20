import { TFilm } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles.module.css'
import { useLanguage } from '@/app/LanguageContext'

const OneFilmEnglish = ({
  _id,
  title,
  originalTitle,
  copyright,
  directedBy,
  producedBy,
  author,
  format,
  duration,
  synopsis,
  partner,
  createdYear,
  festivalAndAward,
  distribution,
  internationalSales,
  stageOfProduction,
  genre,
  category,
  download,
  crew,
  links,
  imageData,
}: TFilm) => {
  const [showVideoOnDemand, setVideoOnDemand] = useState(false)
  const [showDownload, setShowDownload] = useState(false)

  const handleClickVideoOnDemand = () => {
    setVideoOnDemand(!showVideoOnDemand)
  }

  const handleClickDownload = () => {
    setShowDownload(!showDownload)
  }

  const { isEnglish } = useLanguage()
  const getCategoryDisplayName = (catName: string) => {
    return isEnglish && catName === 'en cours' ? 'in progress' : catName
  }

  const getGenreDisplayName = (genre: string) => {
    const genreTranslate: { [key: string]: string } = {
      documentaire: 'documentary',
      commedie: 'comedy',
      drame: 'drama',
    }

    return isEnglish ? genreTranslate[genre] || genre : genre
  }

  return (
    <div className="w-full h-full">
      <div className="xl:flex gap-12">
        <div
          style={{ position: 'relative' }}
          className="xl:w-2/3 md:w-full aspect-video relative"
        >
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
          {copyright && (
            <div className="flex text-sm my-5 absolute bottom-0 right-3 text-white font-light shadow-lg">
              &copy;{copyright}
            </div>
          )}
        </div>
        <div className="xl:w-1/3">
          {title && (
            <div className="flex flex-col items-left text-2xl mt-5">
              <strong>{title.en}</strong>
            </div>
          )}
          {category && (
            <div className="font-bold text-red-700 italic text-sm">
              {getCategoryDisplayName(category.catName).toUpperCase()}
            </div>
          )}
          {createdYear && <div className="font-bold">{createdYear}</div>}
          {synopsis && (
            <div className="flex flex-col items-left text-sm my-5">
              <div className="textp">{synopsis.en}</div>
            </div>
          )}
        </div>
      </div>

      {originalTitle && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>ORIGINAL TITLE</strong>
          <div className="textp">{originalTitle}</div>
        </div>
      )}
      {directedBy && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>DIRECTED BY</strong>
          {directedBy.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {producedBy && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>PRODUCED BY</strong>
          {producedBy.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {author && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>
            {author && author.includes('\n') ? 'AUTHORS' : 'AUTHOR'}
          </strong>
          {author.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {format && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>FORMAT</strong>
          <div className="textp">{format}</div>
        </div>
      )}
      {duration && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>DURATION</strong>
          <div className="textp">{duration}</div>
        </div>
      )}

      {partner && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>
            {partner.en && partner.en.includes('\n') ? 'PARTNERS' : 'PARTNER'}
          </strong>
          {partner.en.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {festivalAndAward && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>FESTIVALS & AWARDS</strong>
          {festivalAndAward.en.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {distribution && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>DISTRIBUTION</strong>
          <div className="textp">{distribution}</div>
        </div>
      )}
      {internationalSales && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>INTERNATIONAL SALES</strong>
          {internationalSales.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}
      {stageOfProduction && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>STAGE OF PRODUCTION</strong>
          <div className="textp">{stageOfProduction}</div>
        </div>
      )}
      {genre && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>GENRE</strong>
          <div className="textp">{getGenreDisplayName(genre)}</div>
        </div>
      )}
      {crew && (
        <div className="flex flex-col items-left text-sm my-5">
          <strong>CREW</strong>
          {crew.split('\n').map((line, index) => (
            <div key={index} className="textp">
              {line}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-left text-sm my-5">
        {links && links.length > 0 && (
          <div>
            <button onClick={handleClickVideoOnDemand}>
              <strong className="flex items-left">VIDEO ON DEMAND</strong>
            </button>

            <div>
              {showVideoOnDemand &&
                links &&
                links.length > 0 &&
                links.map((link: string, i: number) => (
                  <div key={i}>
                    <Link
                      href={`${link}`}
                      target="_blank"
                      className={`link ${styles.PostLink}`}
                    >
                      {link}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-left text-sm my-5">
        {download && (
          <div>
            <button onClick={handleClickDownload}>
              <strong className="flex items-left">
                {showDownload ? 'DOWNLOADS' : 'DOWNLOAD +'}
              </strong>
            </button>

            <div>
              {showDownload && download && (
                <Link
                  href={`${download}`}
                  target="_blank"
                  className={`link ${styles.PostLink}`}
                >
                  {originalTitle}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OneFilmEnglish
