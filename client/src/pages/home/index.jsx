import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'components/navBar'
import FriendListWidget from 'pages/widgts/FriendListWidget'
import PostWidget from 'pages/widgts/PostWidget'
import PostsWidget from 'pages/widgts/PostsWidget'
import UserWidgets from 'pages/widgts/UserWidgets'
import AdvertWidget from 'pages/widgts/advertWidget'
import React from 'react'

const Home = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")


  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidgets />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "46%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rrem"}
        >
          <PostWidget />
          <br /> <br />
          <PostsWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AdvertWidget /> 
          <br /> <br />
          <FriendListWidget />

        </Box>

      </Box>
      
    </Box>
  )
}

export default Home