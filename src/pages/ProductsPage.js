import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import ProductService from "../services/ProductServices"
import { kpupContext } from '../context';
import NewsServices from '../services/NewsServices';
import Loader from '../helpers/Loader';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { token } = useContext(kpupContext)
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
    const call = async () => {
      await NewsServices.getNews(token)
        .then((res) => {
          console.log(res.data.results)
          setProducts(res.data.results)
          setLoad(false)
        })
    }
    call();
  }, [])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      {
        load ? <Loader /> : <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Articles
            </Typography>
            <div>
              <ProductFilterSidebar
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </div>
          </Stack>

          <ProductList products={products && products} />
          {/* <ProductCartWidget /> */}
        </Container>
      }

    </>
  );
}
