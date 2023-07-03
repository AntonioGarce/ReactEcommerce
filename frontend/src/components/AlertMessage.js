import React from 'react'
import { Alert } from '@mui/material'

function AlertMessage({children, ...props}) { 
  return (
    <Alert sx={{mt:'-15px', mb:'10px'}} {...props} severity={(children===undefined || children==='')?'':'error'}>
        {children}
    </Alert>
  )
}

export default AlertMessage