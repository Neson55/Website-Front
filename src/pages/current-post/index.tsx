import React from 'react'
import { useParams } from 'react-router-dom'

export const CurrentPost = () => {
  const  params = useParams<{id: string}>()
  return (
    <div>CurrentPost</div>
  )
}
