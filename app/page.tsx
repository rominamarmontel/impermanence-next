import Film from '@/components/Film'
import { TFilm } from '@/types'

const getFilms = async (): Promise<TFilm[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/films`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const films = await res.json()
      console.log(films)
      return films
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function Home() {
  const films = await getFilms()

  const sortedFilms = films?.sort((a, b) => {
    if (a && b) {
      const yearComparison = (b.createdYear ?? '').localeCompare(
        a.createdYear ?? ''
      )
      if (yearComparison !== 0) {
        return yearComparison
      }
      return a.originalTitle.localeCompare(b.originalTitle)
    }
    return 0
  })

  return (
    <>
      <div className="md:flex flex-wrap justify-between gap-auto">
        {sortedFilms && sortedFilms.length > 0 ? (
          sortedFilms.map((film: TFilm) => (
            <Film
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
          <div>No films to display</div>
        )}
      </div>
    </>
  )
}
