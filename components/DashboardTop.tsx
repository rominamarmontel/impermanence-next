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
    <div className="w-full">
      <h1 className={styles.DashboardTitle}>Dashboard</h1>
      <div className="flex flex-wrap justify-start mt-10">
        <table className="table-fixed border-collapse border border-green-800 w-full">
          <thead>
            <tr>
              <th className="w-1/10 px-4 py-2 border border-green-600">
                Update @
              </th>
              <th className="w-2/10 px-4 py-2 border border-green-600">
                Title
              </th>
              <th className="w-1/2 px-4 py-2 border border-green-600">
                Content
              </th>
              <th className="w-2/10 px-4 py-2 border border-green-600"></th>
            </tr>
          </thead>
          <tbody>
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
                    <tr key={post._id} className="w-full">
                      <th className="px-4 py-2 text-left border border-green-600">
                        {formattedDate}
                      </th>
                      <td className="px-4 py-2 text-left border border-green-600">
                        {post.postTitle}
                      </td>
                      <td className="textp px-4 py-2 border border-green-600 ">
                        <div className="line-clamp-2">{post.post}</div>
                      </td>
                      <td className="px-4 py-2 border border-green-600">
                        <div className="flex flex-wrap justify-around">
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
                        </div>
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-start mt-10">
        <table className="table-fix border-collapse border border-green-800 w-full">
          <thead>
            <tr>
              <th className="w-1/10 px-4 py-2 border border-green-600">
                Category
              </th>
              <th className="w-1/2 px-4 py-2 border border-green-600">Title</th>
              <th className="w-2/10 px-4 py-2 border border-green-600">Year</th>
              <th className="w-2/10 px-4 py-2 border border-green-600"></th>
            </tr>
          </thead>
          <tbody className="">
            {films && films.length > 0
              ? films.map((film: TFilm) => (
                  <tr key={film._id}>
                    <th className="px-4 py-2 text-left border border-green-600">
                      {film.category?.catName || 'Unknown Category'}
                    </th>
                    <td className="px-4 py-2 text-left border border-green-600">
                      {film.title.fr}
                    </td>
                    <td className="px-4 py-2 border border-green-600">
                      {film.createdYear}
                    </td>
                    <td className="px-4 py-2 border border-green-600 ">
                      <div className="flex justify-around flex-wrap">
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
                      </div>
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
