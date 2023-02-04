import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Grid, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../../../components/label';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'fit',
  position: 'absolute',
});

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products?.map((product, item) => (
        <Grid key={item} item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }} onClick={() => window.open(product.link, '_blank')}>
            <Box sx={{ pt: '100%', position: 'relative' }}>

              <StyledProductImg src={product.image_url && product.image_url} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Link color="inherit" underline="hover">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5" noWrap>
                    {product.title}
                  </Typography>

                </Box>
              </Link>
              <Typography variant='body2' >
                {product.description && product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product.description}
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                {null}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
