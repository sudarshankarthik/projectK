import React, {  useState } from 'react'
import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import WidgetWrapper from 'components/widgetWrapper';
import FlexBetween from 'components/flexBetween';
import UserImage from 'components/UserImage';
import Dropzone from 'react-dropzone';
import { userActions } from 'store/user-slice';


const PostWidget = () => {
  const [image, setImage] = useState(null)
  const [discription, setDiscription] = useState("")
  const user = useSelector((state) => state.user)

  const { palette } = useTheme()

  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()


  const handlePost = async () => {
    const formData = new FormData()
    formData.append("description", discription)
    if (image) {
      formData.append("picture", image)
    }

    const res = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: token },
      body: formData
    })

    const posts = await res.json()

    dispatch(
      userActions.setPosts({
        posts
      })
    );
    setImage(null)
    setDiscription("")

  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="2.5 rem">
        <UserImage image={user.picturePath} />
        <InputBase
          placeholder='whats happening...'
          onChange={(e) => setDiscription(e.target.value)}
          sx={
            {
              width: '100%',
              backgroundColor: palette.background.paper,
              borderRadius: '2rem',
              padding: '1rem 2rem'
            }
          }
        />
      </FlexBetween>
      {(
        <Box
          border='1px solid black'
          borderRadius='2rem'
          mt='1rem'
          p='1rem'
        >

          <Dropzone
            accept={{
              "image": [".png",".jpeg",".jpg"]
            }}
            multiple={false}
            onDrop={(file) => setImage(file[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>

                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{
                    "&:hover": {
                      cursor: "pointer"
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography>{"Add Image Hear"}</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>

                  )
                  }
                </Box>
                {
                  (image && (
                    <>
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>

                      <IconButton
                        onClick={() => handlePost()}
                        sx={{ width: "15%" }}
                      >
                        <SendIcon  />
                      </IconButton>
                    </>
                  ))
                }
              </FlexBetween>
            )}
          </Dropzone>

        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget