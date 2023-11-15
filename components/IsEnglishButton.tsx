'use client'
import { useState } from 'react'

export const IsEnglish = () => {
  const [isEnglish, setIsEnglish] = useState(true)
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
    return (
      <div className="" onClick={toggleLanguage}>
        {isEnglish ? 'English' : 'French'}
      </div>
    )
  }
}
