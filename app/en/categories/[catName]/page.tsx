'use client'

import { FilmEnglish } from '@/components/FilmEnglish'
import { TFilm } from '@/types'
import { useEffect, useState } from 'react'

const CategoryFilmsEnglish = ({ params }: { params: { catName: string } }) => {
  const [films, setFilms] = useState<TFilm[] | null>(null)
  const category = params?.catName

  useEffect(() => {
    const getFilms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/categories/${category}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const films = data.movies
          setFilms(films)
        }
      } catch (error) {
        console.error('Error fetching films:', error)
      }
    }
    getFilms()
  }, [category])

  const sortedFilms = films?.sort((a, b) => {
    if (a && b) {
      const yearComparison = (b.createdYear ?? '').localeCompare(
        a.createdYear ?? ''
      )
      if (yearComparison !== 0) {
        return yearComparison
      }
      return a.originalTitle.localeCompare(String(b.originalTitle))
    }
    return 0
  })

  return (
    <div className="md:flex flex-wrap justify-between gap-auto">
      {sortedFilms && sortedFilms.length > 0 ? (
        sortedFilms.map((film: TFilm) => (
          <FilmEnglish
            key={film._id}
            _id={film._id}
            category={film.category}
            title={film.title}
            originalTitle={film.originalTitle}
            copyright={film.copyright}
            directedBy={film.directedBy}
            producedBy={film.producedBy}
            author={film.author}
            format={film.format}
            duration={film.duration}
            synopsis={film.synopsis}
            partner={film.partner}
            genre={film.genre}
            createdYear={film.createdYear}
            festivalsAndAwards={film.festivalsAndAwards}
            internationalSales={film.internationalSales}
            stageOfProduction={film.stageOfProduction}
            distribution={film.distribution}
            download={film.download}
            crew={film.crew}
            links={film.links || []}
            imageData={film.imageData || []}
          />
        ))
      ) : (
        <div style={{ padding: 16 }} className="loading">
          Loading...
        </div>
      )}
    </div>
  )
}

export default CategoryFilmsEnglish
