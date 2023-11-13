import CreateFilmForm from '@/components/CreateFilmForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const CreateFilm = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }
  return <CreateFilmForm />
}
export default CreateFilm
