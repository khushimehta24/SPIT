import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, CardMedia } from '@mui/material';
// mock
import axios from 'axios';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import detectConfig from './detectConfig';

import logo from "../../../images/logo.png"
import { kpupContext } from '../../../context';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { user, account } = useContext(kpupContext)
  const { pathname } = useLocation();
  const [ip, setIp] = useState('')
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIp(res.data.IPv4)
    }
    getIp()
  }, [])

  const navigate = useNavigate();

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ py: 3, display: 'inline-flex', justifyContent: 'center' }}>
        <CardMedia component='img' image={logo} sx={{ width: '40%' }} />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {/* <Avatar src={'/assets/images/avatars/avatar_default.jpg'} alt="photoURL" /> */}

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {ip !== '' && ip}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Your IP address
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <Box sx={{ mx: 2.5 }}>

        <Typography sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>Statistics</Typography>

        <NavSection data={navConfig} />
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>

        <Typography sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>Detect</Typography>
        <NavSection data={detectConfig} />

      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
