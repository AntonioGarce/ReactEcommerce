import React from 'react'
import { useParams } from 'react-router-dom'

function ErrorScreen() {
  const {message} = useParams()
  return (
    <div>{message}</div>
  )
}

export default ErrorScreen