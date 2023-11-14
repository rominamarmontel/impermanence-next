'use client'
import { useEffect, useState } from 'react'
import { TCategory, TFilm, TNews } from '@/types'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import styles from './styles.module.css'
import { DeleteButtonNews } from './DeleteButtonNews'

const DashboardTop = () => {
  const [films, setFilms] = useState<TFilm[]>([])
  const [posts, setPosts] = useState<TNews[]>([])

  useEffect(() => {
    const fetchAllFilms = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/films`)
        if (res.ok) {
          const data = await res.json()
          setFilms(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllFilms()
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news`)
        if (res.ok) {
          const dataNews = await res.json()
          setPosts(dataNews)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchNews()
  }, [])

  return (
    <div>
      <h1 className={styles.DashboardTitle}>Dashboard</h1>
      <div className="flex flex-wrap justify-start mt-10">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-t border-l border-b">Update @</th>
              <th className="px-4 py-2 border-t border-l border-b">Title</th>
              <th className="px-4 py-2 border-t border-l border-b">Content</th>
              <th className="px-4 py-2 border-t border-l border-b border-r"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {posts && posts.length > 0
              ? posts.map((post: TNews) => {
                  const dateObject = new Date(post.updatedAt)
                  const options: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                  const formattedDate = dateObject.toLocaleDateString(
                    'fr-FR',
                    options
                  )

                  return (
                    <tr key={post._id}>
                      <th className="px-4 py-2 text-left border-b border-l border-r">
                        {formattedDate}
                      </th>
                      <td className="px-4 py-2 text-left border-b border-r">
                        {post.postTitle}
                      </td>
                      <td className="px-4 py-2 border-b border-r">
                        {post.post}
                      </td>
                      <td className="px-4 py-2 flex flex-wrap border-b border-r justify-between">
                        <Link
                          href={`/edit-news/${post._id}`}
                          className="text-green-400 cursor-pointer"
                        >
                          Edit
                        </Link>
                        <DeleteButtonNews
                          id={post._id || ''}
                          publicId={post?.publicId}
                        />
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-start mt-10">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-t border-l border-b">Category</th>
              <th className="px-4 py-2 border-t border-l border-b">Title</th>
              <th className="px-4 py-2 border-t border-l border-b">Year</th>
              <th className="px-4 py-2 border-t border-l border-b border-r"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {films && films.length > 0
              ? films.map((film: TFilm) => (
                  <tr key={film._id}>
                    <th className="px-4 py-2 text-left border-b border-l border-r">
                      {film.category?.catName || 'Unknown Category'}
                    </th>
                    <td className="px-4 py-2 text-left border-b border-r">
                      {film.title.fr}
                    </td>
                    <td className="px-4 py-2 border-b border-r">
                      {film.createdYear}
                    </td>
                    <td className="px-4 py-2 flex flex-wrap border-b border-r justify-between">
                      <Link
                        href={`/edit-film/${film._id}`}
                        className="text-green-400 cursor-pointer"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={film._id}
                        publicId={film?.imageData?.[0]?.publicId}
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardTop
