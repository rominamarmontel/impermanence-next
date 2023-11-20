'use client'

import { useState } from 'react'
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary'
import Image from 'next/image'
import styles from './styles.module.css'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CreateNewsForm = () => {
  const [postTitle, setPostTitle] = useState('')
  const [post, setPost] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [publicId, setPublicId] = useState('')
  const router = useRouter()

  const handleImageUpload = async (result: CldUploadWidgetResults) => {
    const info = result.info as object
    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string
      const public_id = info.public_id as string
      setImageUrl(url)
      setPublicId(public_id)
    }
  }

  async function removeImage(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('api/removeImageNews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      })
      if (res.ok) {
        setImageUrl('')
        setPublicId('')
      } else {
        console.log('Error:', res.status, res.statusText)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postTitle || !post) {
      const errorMessage = 'Title and category are required'
      toast.error(errorMessage)
    }
    try {
      const res = await fetch('api/news/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postTitle,
          post,
          imageUrl,
          publicId,
        }),
      })
      if (res.ok) {
        toast.success('Film created successfully')
        router.push('/dashboard')
        router.refresh()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={styles.Form}>
      <div className={styles.FormContent}>
        <div className="flex flex-col gap-5">
          <Link href={'/dashboard'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
          <h1 className={styles.FormTitle}>Create News</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="News Title"
            onChange={(e) => setPostTitle(e.target.value)}
          />

          <textarea
            placeholder="News contents"
            onChange={(e) => setPost(e.target.value)}
          />

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
            {imageUrl && (
              <Image
                src={imageUrl}
                fill
                className="absolute object-cover inset-0"
                alt={postTitle}
              />
            )}
            {publicId && (
              <span
                onClick={removeImage}
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
            )}
          </div>
          <button className="primary-btn mt-10">Create New</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewsForm
