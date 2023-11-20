'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const DeleteButtonNews = ({
  id,
  publicId,
}: {
  id: string
  publicId: string
}) => {
  const router = useRouter()
  const deleteImage = async (publicId: string) => {
    try {
      console.log('Received publicId:', publicId)
      const res = await fetch('api/removeImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      })
      if (res.ok) {
        console.log('Image deleted from Cloudinary')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure to delete this image??')

    if (confirmed) {
      try {
        const res = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const post = await res.json()
          const { publicId } = post
          await deleteImage(publicId)

          toast.success('Film deleted successfully')
          router.refresh()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  )
}
