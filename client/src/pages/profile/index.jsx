import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'components/navBar'
import FriendListWidget from 'pages/widgts/FriendListWidget'
import PostWidget from 'pages/widgts/PostWidget'
import PostsWidget from 'pages/widgts/PostsWidget'
import UserWidgets from 'pages/widgts/UserWidgets'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const {id} = useParams()
  const token = useSelector((state) => state.token)
  const [user, setuser] = useState(null)



  useEffect(
    () => {

    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
  
        if (!response.ok) throw new Error("getting response failed")
        
        const data = await response.json()
  
        setuser(data)
  
  
      } catch (e) {
        console.error(e)
      }
    }

    getUser()
  }, [id,token]
  )

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidgets />
          <Box m="2rem 0" />
          <FriendListWidget />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rrem"}
        >
          <PostWidget />
          <br /> <br />
          <PostsWidget />
        </Box>
      </Box>
      
    </Box>
  )
}

export default Profile