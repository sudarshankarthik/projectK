import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import WidgetWrapper from 'components/widgetWrapper'
import FlexBetween from 'components/flexBetween'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import UserImage from 'components/UserImage'
const UserWidgets = (props) => {

    const { palette } = useTheme()
    const navigate = useNavigate()

    const cnt_user = useSelector((state) => state.user)
    var user
    if (props.user == null)
        user = cnt_user 
    else
        user = props.user
    const bg = palette.background.main
    const primary = palette.primary.main
    const accent = palette.accent.main

    const {
        firstName,
        lastName,
        friends,
        viewedProfile,
        impressions,
        picturePath,
        userId,
        bio,occupation,location
    } = user


    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pd="1.1rem"
                marginBottom="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween
                    gap="1rem"
                >
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={bg}
                            fontWeight="500"
                            sx={{
                                color: primary,
                                cursor: "pointer"
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={accent}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>
            <Typography color={accent}>{bio}</Typography>    
                <Divider />

                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={accent}>Who's viewed your profile</Typography>
                        <Typography color={primary} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={accent}>Impressions of your post</Typography>
                        <Typography color={primary} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={accent}>Location</Typography>
                        <Typography color={primary} fontWeight="500">{location}</Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={accent}>Occupaton</Typography>
                        <Typography color={primary} fontWeight="500">{occupation}</Typography>
                    </FlexBetween>
                </Box>

        </WidgetWrapper>
    )
}

export default UserWidgets