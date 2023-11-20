import EditNewsForm from '@/components/EditNewsForm'
import { TNews } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const getPostById = async (id: string): Promise<TNews | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch News')
    }
    const data = await res.json()
    return data.post
  } catch (error) {
    console.log(error)
    return null
  }
}
const EditNews = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const id = params.id
  const news = await getPostById(id)
  return <>{news ? <EditNewsForm news={news} /> : <div>Invalid News</div>}</>
}

export default EditNews
