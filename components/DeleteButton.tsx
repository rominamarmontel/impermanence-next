'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const DeleteButton = ({
  id,
  publicId,
}: {
  id: string
  publicId?: string
}) => {
  const router = useRouter()

  const deleteImage = async (publicIds: string[]) => {
    try {
      const res = await fetch('api/removeImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds }),
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
        const res = await fetch(`/api/films/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const deletedFilm = await res.json()
          const publicIds =
            deletedFilm.imageData?.map(
              (image: { publicId: string }) => image.publicId
            ) || []
          await deleteImage(publicIds)
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
