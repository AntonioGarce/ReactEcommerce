import React from 'react'
import Loader from './Loader'
import Message from './Message'

function LoadingWrapper({children, loading, error}) {
  return (
    <>
        {loading?<Loader/>:<>{error && error.length && <Message variant='danger' text = {error} />}{children}</>}
    </>
  )
}

export default LoadingWrapper