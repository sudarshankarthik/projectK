import { useTheme } from '@emotion/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'store/user-slice'
import WidgetWrapper from './widgetWrapper'
import Friend from './Friend'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import FlexBetween from './flexBetween'
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material'
import env from 'react-dotenv'

const Post = ({id,firstName,lastName,discription,likes,comments,location,picturePath,updatedAt,userId,userPicturePath}) => {
  
  const [isComments, setIsComments] = useState(false)

  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedUserId = useSelector((state) => state.user._id)
  var isLiked = Boolean(likes[loggedUserId]);
  var nLikes = Object.keys(likes).length;
  const api = env.API_URL 

  const {palette} = useTheme()

  const patchLike = async () => {
    const response = await fetch(`${api}/posts/${id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    const post = await response.json()
    
    dispatch(userActions.setPost({id,post}))

  }

  return (
    <WidgetWrapper m="2rem 0">
      
      <Friend 
        friendId = {userId} name = {`${firstName} ${lastName}`} subtitle = {location} userPicturePath = {userPicturePath}
      />
      <Typography sx={{mt: "1rem"}} color={palette.text.main} >
        {discription}
      </Typography>
      {
        picturePath && (
          <img 
            width="100%"
            height="100%"
            alt={discription}
            style={{borderRadius: "0.75rem",
                    marginTop: "0.75rem"
          }}
            src={`${picturePath}`}
          />
        )
      }
      <FlexBetween mt="0.2rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {
                isLiked ? (
                  <FavoriteOutlined sx={{color: palette.primary.main}} />
                ) : <FavoriteBorderOutlined />
              }
            </IconButton>
            <Typography>{nLikes}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>

      </FlexBetween>
      {
        isComments && (
          <Box mt="0.5rem">
            {
              comments.map(
                (comment,i) => (
                  <Box key = {`${firstName}-${i}`}>
                    <Divider />
                    <Typography sx={{color: palette.primary.main,m: "0.5rem 0",pl: "1rem"}}>
                      {comment}
                    </Typography>
                  </Box>
                )
              )
            }
          </Box>
        )
      }
    </WidgetWrapper>
  )
}

export default Post