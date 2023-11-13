import Link from 'next/link'
import styles from './styles.module.css'
import { TCategory } from '@/types'
import { useEffect, useState } from 'react'

const CategoriesList = () => {
  const [categories, setCategories] = useState<TCategory[] | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className={styles.CategoriesList}>
      {categories &&
        categories.map((category) => (
          <div
            key={category._id}
            className={styles.CategoriesList_CategoryName}
          >
            <Link href={`/categories/${category.catName}`}>
              {category.catName}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default CategoriesList
