import { Box } from '@mui/material'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'store/user-slice'

const FriendListWidget = () => {

  const { friends } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const friendsData = useSelector((state) => state.friends)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = friends.map(async (friend) => {
          const response = await fetch(`http://localhost:3001/users/${friend}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Response error");
          }
          return response.json();
        });

        const resolvedData = await Promise.all(dataPromises);
        dispatch(
          userActions.setFriends({friends: resolvedData})
        )
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [friends, token,dispatch]);

  if (!friendsData) return (<>loding ... </>)

  return (
    <WidgetWrapper>
      <Box
        display='flex'
        flexDirection='column'
        gap='1.5rem'
      >

            {friendsData.map((friendData) => (
              <Friend
              key={friendData._id}
              friendId={friendData._id}
              name={`${friendData.firstName} ${friendData.lastName}`}
              location={friendData.location}
              userPicturePath={friendData.picturePath}
              />
              ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget