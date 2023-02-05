import { useState, useEffect, useContext } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, InputLabel, MenuItem, Select, CardMedia, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fShortenNumber } from '../../../utils/formatNumber';
import SuggestedProducts from '../../../services/SuggestedProducts';
import SuggestedProductsCard from './SuggestedProductsCard';
// import errorHandler from "../../../helpers/errorHandler"
import spinner from "../../../images/marioloader.gif"
import Loader from '../../../helpers/Loader';
import { kpupContext } from '../../../context';
// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list }) {



  return (
    <>
      <Card>
        <CardHeader title={title} subheader={subheader} />

        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {list.map((site) => (
              <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

                <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {site.name}
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
