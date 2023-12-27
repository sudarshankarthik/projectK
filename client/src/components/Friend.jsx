import { useTheme } from '@emotion/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from 'store/user-slice'
import FlexBetween from './flexBetween'
import UserImage from './UserImage'
import { Box, IconButton, Typography } from '@mui/material'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'

const Friend = ({friendId, name, location, userPicturePath}) => {

    const {palette} = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { friends } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    
    const isFriend = friends.find((friend) => friend === friendId);

    const patchFriend = async () => {
      const response = await fetch(
        `http://localhost:3001/users/friend/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      )

      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setUser({
          user: data
        }));
      } else {
        // Handle non-OK response, e.g., show an error message
        console.error("Failed to update user data:", response.statusText);
      }

      

    }
    

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image = {userPicturePath} size='55px' />
        <Box
          onClick = {
            () => {
              navigate(`/${friendId}`)
              navigate(0)
            }
          }
        >
          <Typography
            color={palette.primary.main}
            variant='h5'
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.accent.main,
                cursor: "pointer"
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.accent.main} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>

      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: palette.primary.main,
          p: "0.6rem"
        }}
      >
        {isFriend ? ( <PersonRemoveOutlined sx={{color: palette.background.main}} /> ) : ( <PersonAddOutlined sx = {{color: palette.text.main}} /> )}
      </IconButton>

    </FlexBetween>
  )
}

export default Friend