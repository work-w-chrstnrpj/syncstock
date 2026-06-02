import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import useLogout from '../../hooks/useLogout';
import ProfilePicture from '../generic/ProfilePicture';
import useFetchUserDetails from '../../hooks/useFetchUserDetails';

const drawerWidth = 260;
const collapsedWidth = 72;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isMobile ? {
    width: '100%',
    marginLeft: 0,
  } : {
    marginLeft: collapsedWidth,
    width: `calc(100% - ${collapsedWidth}px)`,
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'isMobile' })(
  ({ theme, open, isMobile }) => ({
    '& .MuiDrawer-paper': {
      position: isMobile ? 'fixed' : 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      overflowX: 'hidden',
      ...(!isMobile && !open && {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: collapsedWidth,
      }),
    },
  }),
);

const StyledListItem = styled(ListItem)(({ active }) => ({
  margin: '2px 0',
  padding: 0,
  '& .MuiListItemButton-root': {
    borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
    paddingLeft: active ? '13px' : '16px',
    margin: '2px 8px',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
    ...(active && {
      backgroundColor: '#eff6ff',
    }),
  },
  '& .MuiListItemIcon-root': {
    color: active ? '#2563eb' : '#6b7280',
    minWidth: '40px',
  },
  '& .MuiListItemText-primary': {
    color: active ? '#2563eb' : '#4b5563',
    fontWeight: active ? 600 : 500,
    fontSize: '0.875rem',
  },
}));

export default function Dashboard() {
  const { userDetails } = useFetchUserDetails();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(!isMobile);
  
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => setOpen(!open);

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = useLogout();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated && !token) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const navItems = [
    { text: 'Analytics', icon: <BarChartIcon />, path: '/dashboard/analytics' },
    { text: 'Inventory Logger', icon: <InventoryIcon />, path: '/dashboard/inventory' },
    { text: 'Current Stock', icon: <BookIcon />, path: '/dashboard/current-inventory' },
    { text: 'Adjustments', icon: <TransferWithinAStationIcon />, path: '/dashboard/adjustments' },
    { text: 'Transfer', icon: <LocalShippingIcon />, path: '/dashboard/transfer' },
    { text: 'Category', icon: <CategoryIcon />, path: '/dashboard/category' },
    { text: 'Warehouse', icon: <LocationOnIcon />, path: '/dashboard/location' },
  ];

  const bottomNavItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar sx={{ pr: '24px', display: 'flex', gap: 2 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ color: '#4b5563' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton size="small" sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e5e7eb' } }}>
              <NotificationsOutlinedIcon sx={{ color: '#4b5563', fontSize: 20 }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', pl: 1 }}>
              <ProfilePicture />
              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#111827', lineHeight: 1.2 }}>
                  {userDetails.username || 'User'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', lineHeight: 1 }}>
                  {userDetails.email || ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer 
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        isMobile={isMobile}
        onClose={isMobile ? toggleDrawer : undefined}
        ModalProps={{ keepMounted: true }}
      >
        {/* Logo Area */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center',
          px: open ? 2.5 : 1, height: 64, borderBottom: '1px solid #f3f4f6', flexShrink: 0,
        }}>
          {/* Logo mark — always visible */}
          <Tooltip title={!open ? 'Expand sidebar' : ''} placement="right">
            <Box
              onClick={!open ? toggleDrawer : undefined}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden',
                cursor: !open ? 'pointer' : 'default', width: !open ? '100%' : 'auto',
                justifyContent: !open ? 'center' : 'flex-start'
              }}
            >
              <Box sx={{
                width: 34, height: 34, bgcolor: '#2563eb', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>S</Typography>
              </Box>
              {/* Title only when expanded */}
              {open && (
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>
                  SyncStock
                </Typography>
              )}
            </Box>
          </Tooltip>

          {/* Toggle button - only visible when expanded */}
          {open && (
            <Tooltip title="Collapse sidebar" placement="right">
              <IconButton onClick={toggleDrawer} size="small" sx={{ color: '#6b7280', flexShrink: 0 }}>
                <MenuOpenIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Main Nav */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', pt: 1.5 }}>
          {open && (
            <Typography variant="caption" sx={{
              px: 3, color: '#9ca3af', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 0.5
            }}>
              Main Menu
            </Typography>
          )}
          <List dense disablePadding>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink to={item.path} style={{ textDecoration: 'none' }} key={item.text}>
                  <Tooltip title={!open ? item.text : ''} placement="right">
                    <StyledListItem active={active ? 1 : 0} disablePadding>
                      <Box sx={{
                        display: 'flex', alignItems: 'center', width: '100%',
                        borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                        backgroundColor: active ? '#eff6ff' : 'transparent',
                        margin: '2px 8px', borderRadius: '8px',
                        paddingLeft: active ? '13px' : '16px',
                        paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px',
                        cursor: 'pointer', gap: 1.5,
                        '&:hover': { backgroundColor: active ? '#eff6ff' : '#f3f4f6' },
                        transition: 'background-color 0.15s',
                      }}>
                        <Box sx={{ color: active ? '#2563eb' : '#6b7280', display: 'flex', flexShrink: 0 }}>
                          {item.icon}
                        </Box>
                        {open && (
                          <Typography sx={{
                            color: active ? '#2563eb' : '#4b5563',
                            fontWeight: active ? 600 : 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                          }}>
                            {item.text}
                          </Typography>
                        )}
                      </Box>
                    </StyledListItem>
                  </Tooltip>
                </NavLink>
              );
            })}
          </List>

          <Divider sx={{ my: 2, mx: 2 }} />

          {open && (
            <Typography variant="caption" sx={{
              px: 3, color: '#9ca3af', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 0.5
            }}>
              Help & Settings
            </Typography>
          )}
          <List dense disablePadding>
            {bottomNavItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink to={item.path} style={{ textDecoration: 'none' }} key={item.text}>
                  <Tooltip title={!open ? item.text : ''} placement="right">
                    <StyledListItem active={active ? 1 : 0} disablePadding>
                      <Box sx={{
                        display: 'flex', alignItems: 'center', width: '100%',
                        borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                        backgroundColor: active ? '#eff6ff' : 'transparent',
                        margin: '2px 8px', borderRadius: '8px',
                        paddingLeft: active ? '13px' : '16px',
                        paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px',
                        cursor: 'pointer', gap: 1.5,
                        '&:hover': { backgroundColor: active ? '#eff6ff' : '#f3f4f6' },
                        transition: 'background-color 0.15s',
                      }}>
                        <Box sx={{ color: active ? '#2563eb' : '#6b7280', display: 'flex', flexShrink: 0 }}>
                          {item.icon}
                        </Box>
                        {open && (
                          <Typography sx={{
                            color: active ? '#2563eb' : '#4b5563',
                            fontWeight: active ? 600 : 500, fontSize: '0.875rem', whiteSpace: 'nowrap',
                          }}>
                            {item.text}
                          </Typography>
                        )}
                      </Box>
                    </StyledListItem>
                  </Tooltip>
                </NavLink>
              );
            })}

            {/* Logout */}
            <Tooltip title={!open ? 'Logout' : ''} placement="right">
              <StyledListItem active={0} disablePadding onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', width: '100%',
                  borderLeft: '3px solid transparent',
                  margin: '2px 8px', borderRadius: '8px',
                  paddingLeft: '16px', paddingRight: '16px',
                  paddingTop: '10px', paddingBottom: '10px',
                  gap: 1.5, cursor: 'pointer',
                  '&:hover': { backgroundColor: '#fef2f2' },
                  transition: 'background-color 0.15s',
                }}>
                  <Box sx={{ color: '#ef4444', display: 'flex', flexShrink: 0 }}>
                    <LogoutIcon />
                  </Box>
                  {open && (
                    <Typography sx={{ color: '#ef4444', fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                      Logout
                    </Typography>
                  )}
                </Box>
              </StyledListItem>
            </Tooltip>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor: '#f9fafb' }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
