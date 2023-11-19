'use client'

import OneFilmEnglish from '@/components/OneFilmEnglish'
import { TCategory, TFilm } from '@/types'
import { useEffect, useState } from 'react'

const getCategory = async (): Promise<TCategory[] | null> => {
  try {
    const resCat = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: 'no-store',
    })
    if (resCat.ok) {
      const categories = await resCat.json()
      return categories
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const getFilm = async (id: string): Promise<TFilm | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/films/${id}`, {
      cache: 'no-store',
    })

    if (res.ok) {
      const data = await res.json()
      const film = await data.film
      return film
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const DetailsFilm = ({ params }: { params: { id: string } }) => {
  const [film, setFilm] = useState<TFilm | null>(null)
  const [categories, setCategories] = useState<TCategory[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFilm = await getFilm(params.id)
      setFilm(fetchedFilm)
      const fetchedCategories = await getCategory()
      setCategories(fetchedCategories)
    }

    fetchData()
  }, [params.id])

  if (film === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex flex-wrap justify-start">
        {film ? (
          <OneFilmEnglish
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
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </>
  )
}

export default DetailsFilm
