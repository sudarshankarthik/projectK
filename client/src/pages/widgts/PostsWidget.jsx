
import Post from 'components/Post'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'store/user-slice'


const PostsWidget = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts); // Use the selector to get posts

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Error getting response', response);

        const data = await response.json();

        dispatch(userActions.setPosts({ posts: data }));
      } catch (error) {
        console.error(error);
      }
    };

    if (posts === null) {
      // Only fetch posts if they are not already in the Redux store
      getPosts();
    }
  }, [dispatch, token, posts]);

  if (!posts) return <>Loading...</>;


  return (
   <WidgetWrapper>
        {
            posts.map(
                ({_id,userId,firstName,lastName,location,discription,picturePath,userPicturePath,comments,likes,updatedAt}) => {
                    return (<Post
                        key={_id}
                        id = {_id} firstName = {firstName} lastName = {lastName} discription = {discription} likes = {likes} comments = {comments} location = {location} picturePath = {picturePath} updatedAt = {updatedAt} userId = {userId} userPicturePath = {userPicturePath}
                        />)
                }
            )
        }
    </WidgetWrapper>
  )
}

export default PostsWidget