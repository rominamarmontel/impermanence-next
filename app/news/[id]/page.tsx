import OneNews from '@/components/OneNews'
import { TNews } from '@/types'

const getNews = async (id: string): Promise<TNews | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const news = data.post
      return news
    }
  } catch (error) {
    console.log(error)
  }
  return null
}
export default async function getOneNews({
  params,
}: {
  params: { id: string }
}) {
  const news = await getNews(params.id)

  return (
    <>
      {news && (
        <OneNews
          key={news._id}
          _id={news._id}
          postTitle={news.postTitle}
          post={news.post}
          imageUrl={news.imageUrl}
          publicId={news.publicId}
          updatedAt={news.updatedAt}
        />
      )}
    </>
  )
}
