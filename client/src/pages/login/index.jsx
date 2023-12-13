import { useTheme } from '@emotion/react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Form from './Form'

const Login = () => {
  const theme = useTheme()
  const isMobile = !useMediaQuery('(min-width: 1000px)')  
  

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.accent.main}
        p='1rem 6%'
        textAlign='center'
      >

      <Typography
        fontWeight='bold'
        fontSize='2rem'
        color='primary'
        sx={{
          "&:hover": {
            color: theme.palette.background.main,
            cursor: "pointer"
          }
        }}
        >
          ProjectK
        </Typography>
        </Box>

        <Box
          width={isMobile ? "90%" : "50%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.main}
        >
          <Typography fontWeight='bold' variant='h3' m='1rem' textAlign='center'>
            Welcome to ProjectK
          </Typography>
          <Form />
        </Box>
    </Box>
  )
}

export default Login