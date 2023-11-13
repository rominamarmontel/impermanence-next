'use client'
import { useEffect, useState } from 'react'
import { TCategory, TFilm } from '@/types'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import styles from './styles.module.css'

const DashboardTop = () => {
  const [films, setFilms] = useState<TFilm[]>([])

  useEffect(() => {
    const fetchAllFilms = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/films`)
        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setFilms(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllFilms()
  }, [])

  return (
    <div>
      <h1 className={styles.DashboardTitle}>Dashboard</h1>
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
