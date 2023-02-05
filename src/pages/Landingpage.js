import { Box, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, Rating, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab';
import HorizontalScroll from 'react-horizontal-scrolling'
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@emotion/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewsServices from '../services/NewsServices'
import AppWebsiteVisits from '../sections/@dashboard/app/AppWebsiteVisits';
import { AppConversionRates, AppCurrentVisits, AppTrafficBySite, AppWidgetSummary } from '../sections/@dashboard/app';
import AuthServices from '../services/AuthServices';


function Landingpage() {
    const [json, setJson] = useState(null)
    const category = ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design', 'Security Misconfiguration', 'Outdated Components']
    const theme = useTheme();
    const [website, setWebsite] = useState('')
    const [load, setLoad] = useState(false)


    const detect = async () => {
        setLoad(true)
        await AuthServices.detect(website)
            .then((res) => {
                console.log(res.data)
                setJson(res.data)
                setLoad(false)
            })
    }



    return (
        <>
            <Typography variant="h3" sx={{ mb: 5 }}>
                Hi, Welcome to <span style={{ "color": "#5DBAE8" }}>Secure Net</span>
            </Typography>
            <Grid container columnSpacing={3} rowSpacing={3}>
                <Grid item md={12}>
                    <Card sx={{ height: "100%", padding: '3%', width: '100%' }}>
                        <h4>Is this website secured?</h4>
                        <Grid item container md={12}>
                            <Grid item md={11}>
                                <TextField value={website} sx={{ width: '100%' }} placeholder='Enter the link of the website' onChange={(e) => setWebsite(e.target.value)} name='website' />
                            </Grid>
                            <Grid item md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {!load ? <CheckCircleIcon sx={{ height: '100%', color: 'grey', fontSize: '3rem', cursor: 'pointer' }} onClick={detect} /> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CircularProgress sx={{ backgroundColor: '#5DBAE8', color: 'white', padding: '5px', borderRadius: '50%' }} />
                                </Box>}

                            </Grid>
                            {
                                json && <>
                                    <Grid columnSpacing={3} item xs={12} md={6} lg={6}>
                                        <AppConversionRates
                                            chartData={json[0].categories}
                                        />
                                    </Grid>
                                    <Grid item md={6} spacing={3} rowSpacing={3}>
                                        <AppTrafficBySite
                                            list={[
                                                {
                                                    name: 'Child Safety Reputation',
                                                    value: json[0].childSafety.reputations,
                                                },
                                                {
                                                    name: 'Child Safety Confidence',
                                                    value: json[0].childSafety.confidence,
                                                },
                                                {
                                                    name: 'Safety Reputation',
                                                    value: json[0].safety.reputations,
                                                },
                                                {
                                                    name: 'Safety Confidence',
                                                    value: json[0].safety.confidence,
                                                },
                                            ]}
                                        />
                                    </Grid>
                                </>
                            }

                        </Grid>
                    </Card>
                </Grid>

                <Grid item container columnSpacing={3} sx={{ marginTop: '3%' }}>
                    <Grid item xs={12} md={6} lg={8} columnSpacing={3} >
                        <AppWebsiteVisits
                            title="Network threat analysis"
                            subheader="last year"
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
            </Grid>
        </>
    )
}

export default Landingpage