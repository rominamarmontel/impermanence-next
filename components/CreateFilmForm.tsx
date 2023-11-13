'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { TCategory } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import styles from './styles.module.css'

const CreateFilmForm = () => {
  const [titles, setTitles] = useState<{ en: string; fr: string }>({
    en: '',
    fr: '',
  })
  const [categories, setCategories] = useState<TCategory[]>([])
  const [category, setCategory] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [copyright, setCopyright] = useState('')
  const [directedBy, setDirectedBy] = useState('')
  const [producedBy, setProducedBy] = useState('')
  const [author, setAuthor] = useState('')
  const [format, setFormat] = useState('')
  const [duration, setDuration] = useState('')
  const [synopses, setSynopses] = useState<{ en: string; fr: string }>({
    en: '',
    fr: '',
  })
  const [partner, setPartner] = useState('')
  const [createdYear, setCreatedYear] = useState('')
  const [festivalsAndAwards, setFestivalsAndAwards] = useState('')
  const [distribution, setDistribution] = useState('')
  const [internationalSales, setInternationalSales] = useState('')
  const [stageOfProduction, setStageOfProduction] = useState('')
  const [genre, setGenre] = useState('-1')
  const [download, setDownload] = useState('')
  const [crew, setCrew] = useState('')
  const [links, setLinks] = useState<string[]>([])
  const [linkInput, setLinkInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageData, setImageData] = useState<
    { url: string; publicId: string }[]
  >([])

  const router = useRouter()

  useEffect(() => {
    const fetchAllCategoris = async () => {
      const res = await fetch('api/categories', {
        cache: 'no-store',
      })
      const catName = await res.json()
      setCategories(catName)
    }
    if (categories.length === 0) {
      fetchAllCategoris()
    }
  }, [categories])

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (linkInput.trim() !== '') {
      setLinks((prev) => [...prev, linkInput])
      setLinkInput('')
    }
  }

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object
    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string
      const publicId = info.public_id as string
      setImageData((prev) => {
        const updatedData = [...prev, { url, publicId }]
        return updatedData
      })
    }
  }

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const removeImage = async (index: number) => {
    try {
      const res = await fetch(`api/removeImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: imageData[index].publicId }),
      })
      if (res.ok) {
        setImageData((prev) => prev.filter((_, i) => i !== index))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titles.en || !titles.fr || category === '-1' || genre === '-1') {
      const errorMessage = 'Title, category and genre are required'
      toast.error(errorMessage)
    }

    const titleString = JSON.stringify(titles)
    const synopsesString = JSON.stringify(synopses)

    try {
      const res = await fetch('api/films/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          title: titleString,
          originalTitle,
          copyright,
          directedBy,
          producedBy,
          author,
          format,
          duration,
          synopsis: synopsesString,
          partner,
          createdYear,
          festivalsAndAwards,
          distribution,
          internationalSales,
          stageOfProduction,
          genre,
          download,
          crew,
          links,
          imageData,
        }),
      })
      if (res.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleTitleChangeEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles({ ...titles, en: e.target.value })
    console.log(titles)
  }
  const handleTitleChangeFr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles({ ...titles, fr: e.target.value })
    console.log(titles)
  }
  return (
    <div className={styles.Form}>
      <div className={styles.FormContent}>
        <div className="">
          <h1 className={styles.FormTitle}>Create New film</h1>
        </div>
        <p className="text-right text-red-400">
          *Title, Category and genre are required!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-red-400 appearance-none"
          >
            <option value="-1">Choose a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category.catName}>
                  {category.catName}
                </option>
              ))}
          </select>

          <div className="md:flex md:gap-2">
            <input
              onChange={handleTitleChangeEn}
              type="text"
              placeholder="Title (English)"
              className="md:flex-1 w-[100%] border border-red-400"
            />
            <input
              onChange={handleTitleChangeFr}
              type="text"
              placeholder="Title (French)"
              className="md:flex-1 w-[100%] border border-red-400 "
            />
          </div>
          <input
            onChange={(e) => setOriginalTitle(e.target.value)}
            type="text"
            placeholder="Original Title"
          />
          <input
            onChange={(e) => setCopyright(e.target.value)}
            type="text"
            placeholder="Copyright"
          />
          <textarea
            onChange={(e) => setDirectedBy(e.target.value)}
            placeholder="Directed by"
          />
          <textarea
            onChange={(e) => setProducedBy(e.target.value)}
            placeholder="Produced by"
          />
          <textarea
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
          <input
            onChange={(e) => setFormat(e.target.value)}
            type="text"
            placeholder="Format"
          />
          <input
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            placeholder="Duration"
          />
          <input
            onChange={(e) => setCreatedYear(e.target.value)}
            type="text"
            placeholder="Created Year"
          />
          <div className="md:flex md:gap-2">
            <textarea
              onChange={(e) => setSynopses({ ...synopses, en: e.target.value })}
              placeholder="Synopsis (English)"
              className="md:flex-1 w-[100%] border border-red-400 "
            />
            <textarea
              onChange={(e) => setSynopses({ ...synopses, fr: e.target.value })}
              placeholder="Synopsis (French)"
              className="md:flex-1 w-[100%] border border-red-400 "
            />
          </div>
          <textarea
            onChange={(e) => setPartner(e.target.value)}
            placeholder="Partner"
          />
          <textarea
            onChange={(e) => setFestivalsAndAwards(e.target.value)}
            placeholder="Festivals & Awards"
          />
          <input
            onChange={(e) => setDistribution(e.target.value)}
            type="text"
            placeholder="Distribution"
          />
          <input
            onChange={(e) => setInternationalSales(e.target.value)}
            type="text"
            placeholder="International Sales"
          />
          <input
            onChange={(e) => setStageOfProduction(e.target.value)}
            type="text"
            placeholder="Stage of production"
          />
          <select
            onChange={(e) => setGenre(e.target.value)}
            className="p-3 border appearance-none border-red-400"
          >
            <option value="-1">Choose a genre</option>
            <option value="documentaire">documentaire</option>
            <option value="drama">drama</option>
            <option value="science-fiction">science-fiction</option>
            <option value="comedie">comedie</option>
          </select>

          <textarea
            onChange={(e) => setCrew(e.target.value)}
            placeholder="Crew"
          />

          <input
            onChange={(e) => setDownload(e.target.value)}
            type="text"
            placeholder="Download URL"
          />

          {/* Links---Video on Demande */}
          {links &&
            links.map((link, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                  </svg>
                </span>
                <Link href={link} target="_blank" className="link">
                  {link}
                </Link>
                <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </div>
            ))}
          <div className="flex gap-2">
            <input
              type="text"
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="Video on Demand URL"
              className="flex-1"
              value={linkInput}
            />
            <button
              onClick={addLink}
              className=" bg-red-400 flex gap-2 items-center border border-black p-2 font-playfair"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                </svg>
              </span>
              Add
            </button>
          </div>

          <div className="relative">
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onUpload={handleImageUpload}
              className={`h-48 w-full border-2 mt-4 border-dotted grid place-items-center bg-slate-100 ${
                imageUrl && 'pointer-events-none'
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            </CldUploadButton>
            {imageData.map((image, index) => (
              <div
                key={index}
                className="relative"
                style={{ display: 'inline-block' }}
              >
                <Image
                  src={image.url}
                  alt={originalTitle}
                  width={150}
                  height={150}
                />
                <span
                  onClick={() => removeImage(index)}
                  className="m-1 w-7 h-7 absolute top-0 right-0 text-white cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>

          <button className="primary-btn mt-10">Creat New Film</button>
        </form>
      </div>
    </div>
  )
}

export default CreateFilmForm
