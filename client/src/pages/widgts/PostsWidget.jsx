import { useTheme } from '@emotion/react'
import Post from 'components/Post'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'store/user-slice'


const PostsWidget = () => {

    const [posts, setposts] = useState(null)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)

    const { palette }  = useTheme()



      useEffect(
         () => {
            const getPosts = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/posts`, {
                        method: "GET",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json"
                        }
                      })
        
                    if(!response.ok) throw new Error("error getting response",response)
        
                    const data =  await response.json()
        
                    setposts(data)
        
                } catch (error) {
                    console.error(error);
                }
        
        
              }
            getPosts()
        }, []
        )

        if (posts == null) return (<>loding ... </>)

        dispatch(
            userActions.setPosts({
              posts
            })
          );


  return (
   <WidgetWrapper>
        {
            posts.map(
                ({_id,userId,firstName,lastName,location,discription,picturePath,userPicturePath,comments,likes,updatedAt}) => {
                    return (<Post 
                        id = {_id} firstName = {firstName} lastName = {lastName} discription = {discription} likes = {likes} comments = {comments} location = {location} picturePath = {picturePath} updatedAt = {updatedAt} userId = {userId} userPicturePath = {userPicturePath}
                        />)
                }
            )
        }
    </WidgetWrapper>
  )
}

export default PostsWidget