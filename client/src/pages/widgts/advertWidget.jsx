import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import FlexBetween from 'components/flexBetween'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useEffect, useState } from 'react'

const AdvertWidget = () => {

    const {palette} = useTheme()

    const [ad, setAd] = useState(null);

    useEffect(() => {
      const getAd = async () => {
        try {
          const response = await fetch("http://localhost:3001/ad");
          if (!response.ok) {
            throw new Error('Failed to fetch ad');
          }
          const data = await response.json();
          setAd(data);
        } catch (error) {
          console.error('Error fetching ad:', error);
        }
      };
  
      getAd();
    }, []); // Empty dependency array to run the effect only once on mount

    


  return (
    ad && <WidgetWrapper>
        <FlexBetween>
            <Typography color={palette.text.main} variant='h5' fontWeight='500'> 
                Sponsored
            </Typography>
            <Typography color={palette.accent.main}>
                Create Ad
            </Typography>
        </FlexBetween>
        <img 
            width="100%"
            height="auto"
            alt="ad"
            src= {`http://localhost:3001/images/${ad.picturePath}`}
            style={{borderRadius: "0.75rem",margin: "0.75rem 0"}}
        />
        <FlexBetween>
            <Typography color={palette.primary.main} m="0.5rem 0" variant='h5' > {ad.name} </Typography>
        </FlexBetween>
            <Typography> {ad.description} </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget