import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HorizontalScroll from 'react-horizontal-scrolling'
import StarIcon from '@mui/icons-material/Star';
import NewsServices from '../services/NewsServices'


function Landingpage() {
    const [news, setNews] = useState([])
    useEffect(() => {
        const getN = async () => {
            await NewsServices.getNews()
                .then((res) => {
                    console.log(res.data.articles)
                    setNews(res.data.articles)
                })
        }
        getN()
    }, [])

    return (
        <>
            <Typography variant="h3" sx={{ mb: 5 }}>
                Hi, Welcome to <span style={{ "color": "#5DBAE8" }}>Secure Net</span>
            </Typography>

        </>
    )
}

export default Landingpage