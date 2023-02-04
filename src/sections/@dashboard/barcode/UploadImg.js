import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import ImageUploader from 'react-image-upload'
import { v4 as uuidv4 } from 'uuid';
import 'react-image-upload/dist/index.css'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { LoadingButton } from '@mui/lab';
import { faker } from '@faker-js/faker';
import NewsServices from '../../../services/NewsServices';
import { storage } from "../../../firebase/config"
import BarcodeService from '../../../services/BarcodeService';
import AddProduct from '../app/AddProduct';
import Loader from '../../../helpers/Loader';
import ProductServices from '../../../services/ProductServices';
import { kpupContext } from '../../../context';
import successHandler from '../../../helpers/successHandler';
import { AppOrderTimeline, AppWebsiteVisits, AppWidgetSummary } from '../app';

const AddBtn = {
    color: 'white', background: '#5DBAE8',
    fontFamily: 'Poppins', padding: '0px 2.6rem', height: '100%'
}
function UploadImg() {
    const { token } = useContext(kpupContext)
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [editSinglePerson, setEditSinglePerson] = useState('Add');
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(false)
    const [json, setJson] = useState(null)
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        setLoad(true)
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
                console.log(url);
                setLoad(true)
                setLoading(false)
            });
        });
    };

    useEffect(() => {
        const getEx1 = async () => {
            await NewsServices.ex1()
                .then((res) => {
                    console.log(res)
                    setJson(res.data)
                })
        }
        getEx1()
    }, [])


    return (
        <>
            <Grid container>
                <Grid item md={10}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="file"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        }}
                    />

                </Grid>
                <Grid item md={2}>
                    <LoadingButton
                        type="submit"
                        color="primary"
                        style={AddBtn} onClick={uploadFile}
                        loading={loading}
                        variant="contained"
                    >
                        Upload
                    </LoadingButton>
                </Grid>
            </Grid>

            {
                load && json && <Grid item container rowSpacing={3} columnSpacing={3} sx={{ marginTop: '3%' }} > <Grid item md={8}>
                    <AppWebsiteVisits
                        title="Data Exfiltration1"
                        subheader="bytes / IP"
                        chartLabels={json.all_ips}
                        chartData={[
                            {
                                name: 'Average Incidence Rate',
                                type: 'column',
                                fill: 'solid',
                                data: json.out_byte,
                            }
                        ]}
                    />
                </Grid>
                    <Grid item md={4}>
                        <AppWidgetSummary title={json.response} color="warning" total='Cause' />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <AppOrderTimeline
                            title="Protect Yourself Now"
                            list={[...Array(5)].map((_, index) => ({
                                title: [
                                    'Network monitoring and traffic analysis',
                                    'Data leak prevention (DLP) software',
                                    'Endpoint security',
                                    'Firewall rules and restrictions'
                                ][index],
                                time: ['Use network monitoring and traffic analysis tools to identify and track excessive data transfer from a single host, and investigate any suspicious activity.',
                                    'Implement DLP software to monitor and block sensitive data from being transmitted outside the enterprise.',
                                    'Ensure that endpoint security measures, such as anti-virus software, are in place and up-to-date on all hosts to prevent malicious data exfiltration.',
                                    'Configure firewall rules and restrictions to limit or block excessive data transfer from a single host.'
                                ],
                            }))}
                        />
                    </Grid>
                </Grid>
            }



        </>
    )
}

export default UploadImg