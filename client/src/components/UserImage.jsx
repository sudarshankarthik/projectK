import { Box } from '@mui/material'
import React from 'react'
import env from 'react-dotenv'

const UserImage = ({image,size="60px"}) => {

  const api = env.API_URL 

  return (
    <Box width={size} height={size}>
        <img
            style={{
                objectFit: "cover",
                borderRadius: "50%"
            }}
            width={size}
            height={size}
            alt='user'
            src={`${api}/images/${image}`}
        />
    </Box>
  )
}

export default UserImage