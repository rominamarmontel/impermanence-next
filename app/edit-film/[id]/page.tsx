import EditFilmForm from '@/components/EditFilmForm'
import { TFilm } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const getFilmById = async (id: string): Promise<TFilm | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/films/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch film')
    }
    const data = await res.json()
    return data.film
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function EditFilm({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }

  const id = params.id
  const film = await getFilmById(id)
  return <>{film ? <EditFilmForm film={film} /> : <div>Invalid Film</div>}</>
}
