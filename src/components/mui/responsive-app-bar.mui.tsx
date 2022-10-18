import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useNavigate } from "react-router-dom";


import { AppStoreContext } from '../../stores/app-store.context';

// const pages = ['Products', 'Pricing', 'Blog'];



export const ResponsiveAppBar = (props: any) => {
  const navigate = useNavigate();

  const menuLoggedIn: any = [
    {
      label: ``,
      handler: () => {},
    }
  ];
  const menuLoggedOut: any = [
    {
      label: `Login`,
      handler: () => {},
    }
  ];

  const pagesLoggedIn: any = [
    {
      label: ``,
      handler: () => {},
    }
  ];
  const pagesLoggedOut: any = [
    {
      label: `Login`,
      handler: () => {
        navigate(`/login`);
      },
    },
    {
      label: `Signup`,
      handler: () => {
        navigate(`/signup`);
      },
    },
  ];

  const appStoreContext = useContext(AppStoreContext);

  const useMenu = !!appStoreContext.you ? menuLoggedIn : menuLoggedOut;
  const usePages = !!appStoreContext.you ? pagesLoggedIn : pagesLoggedOut;

  useMenu.forEach((m) => { m.key = Date.now() });

  console.log({ useMenu, usePages, appStoreContext });

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Avenger
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {usePages.map((page) => (
                <MenuItem key={page.label || page} onClick={() => page.handler && page.handler()}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Avenger
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {usePages.map((page) => (
              <Button
                key={page.label || page}
                onClick={() => page.handler && page.handler()}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {
            !!appStoreContext.you && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open Menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {useMenu.map((item) => (
                    <MenuItem key={item.label} onClick={() => item.handler && item.handler()}>
                      <Typography textAlign="center">{ item.label }</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

