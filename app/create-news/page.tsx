import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import CreateNewsForm from '@/components/CreateNewsForm'

const CreateFilm = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }
  return <CreateNewsForm />
}
export default CreateFilm
