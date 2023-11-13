'use client'

import { TFilm } from '@/types'
import Link from 'next/link'

const FilmList = ({ _id, category, title, createdYear }: TFilm) => {
  return (
    <tbody className="w-full">
      <tr>
        {category && (
          <th className="px-4 py-2 text-left border-b border-l border-r">
            {category.catName}
          </th>
        )}
        {/* <td className="px-4 py-2 text-left border-b border-r">{title}</td> */}
        <td className="px-4 py-2 border-b border-r">{createdYear}</td>
        <td className="px-4 py-2 flex flex-wrap border-b border-r justify-between">
          <Link href="" className="text-green-400 cursor-poiner">
            Edit
          </Link>
          <Link href="" className="text-red-400 cursor-poiner">
            Delete
          </Link>
        </td>
      </tr>
    </tbody>
  )
}

export default FilmList
