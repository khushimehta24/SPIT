import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HorizontalScroll from 'react-horizontal-scrolling'
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@emotion/react';
import NewsServices from '../services/NewsServices'
import AppWebsiteVisits from '../sections/@dashboard/app/AppWebsiteVisits';
import { AppCurrentVisits } from '../sections/@dashboard/app';


function Landingpage() {
    const [news, setNews] = useState([])
    const category = ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design', 'Security Misconfiguration', 'Outdated Components']
    const theme = useTheme();

    return (
        <>
            <Typography variant="h3" sx={{ mb: 5 }}>
                Hi, Welcome to <span style={{ "color": "#5DBAE8" }}>Secure Net</span>
            </Typography>
            <Grid container columnSpacing={3}>

                <Grid item xs={12} md={6} lg={8} columnSpacing={3}>
                    <AppWebsiteVisits
                        title="Network threat analysis"
                        subheader="(+43%) than last year"
                        chartLabels={category?.length !== 0 && category?.map((item) => `${item.substring(0, 5)}...`)}
                        chartData={[
                            {
                                name: 'Average Incidence Rate',
                                type: 'column',
                                fill: 'solid',
                                data: [3.81, 4.49, 3.37, 3, 4.5, 8.77],
                            },
                            {
                                name: 'Occurences (k)',
                                type: 'area',
                                fill: 'gradient',
                                data: [318, 233, 274, 262, 208, 30],
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ height: '100%' }}>
                    <AppCurrentVisits
                        title="Average Occurences"
                        chartData={[
                            { label: 'Broken Access Control', value: 318487 },
                            { label: 'Cryptographic Failures', value: 233788 },
                            { label: 'Injection', value: 274228 },
                            { label: 'Insecure Design', value: 262407 },
                            { label: 'Security Misconfiguration', value: 208387 },
                            { label: 'Outdated Components', value: 30457 },
                        ]}
                        chartColors={[
                            theme.palette.primary.main,
                            theme.palette.info.main,
                            theme.palette.warning.main,
                            theme.palette.error.main,
                        ]}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Landingpage