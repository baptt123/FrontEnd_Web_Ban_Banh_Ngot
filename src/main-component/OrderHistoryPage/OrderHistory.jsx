import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Avatar,
  LinearProgress,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard,
  History,
  Analytics,
  Assessment,
  Person,
  Help,
  Settings,
  ExitToApp,
  Menu as MenuIcon
} from '@mui/icons-material';

const orders = Array(10).fill(null).map((_, index) => ({
  id: `INV-01-0907201${index}`,
  invoice: `INV-01-0907201${index}`,
  status: "Active",
  customer: {
    name: "Esther Liana",
    email: "estherliana@gmail.com",
    avatar: `https://randomuser.me/api/portraits/women/${44 + index}.jpg`,
  },
  progress: 35 + (index * 5),
}));

const menuItems = [
  { text: 'Order History', icon: <History />, active: true },
  { text: 'Overview', icon: <Dashboard /> },
  { text: 'Analytics', icon: <Analytics /> },
  { text: 'Reports', icon: <Assessment /> },
  { text: 'Profile', icon: <Person /> },
  { text: 'Help Center', icon: <Help /> },
  { text: 'Settings', icon: <Settings /> },
];

const OrderHistoryDashboard = () => {
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(new Set(orders.map(order => order.id)));
    } else {
      setSelectedOrders(new Set());
    }
  };

  const handleSelectOrder = (orderId) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Navigation
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.100' }}>
          Dashboard Menu
        </Typography>
      </Box>

      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                bgcolor: item.active ? 'rgba(255,255,255,0.15)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.active && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'white',
                    borderRadius: '50%',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<ExitToApp />}
          sx={{
            color: 'white',
            borderColor: 'rgba(255,255,255,0.3)',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.5)',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  const mainContent = (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 300 }}>
          Welcome, Amanda
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tue, 07 June 2022
        </Typography>
      </Box>

      {/* Info Card */}
      <Card sx={{ mb: 4, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            Order History Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage all your orders in one place. Monitor progress, 
            update statuses, and maintain customer relationships effectively.
          </Typography>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedOrders.size > 0 && selectedOrders.size < orders.length}
                  checked={orders.length > 0 && selectedOrders.size === orders.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Invoice
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Customer
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Progress
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                selected={selectedOrders.has(order.id)}
                sx={{ 
                  '&:hover': { bgcolor: 'primary.50' },
                  bgcolor: selectedOrders.has(order.id) ? 'primary.50' : 'inherit'
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrders.has(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {order.invoice}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color="success"
                    size="small"
                    icon={<Box component="span">✅</Box>}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {order.customer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress
                      variant="determinate"
                      value={order.progress}
                      sx={{ mb: 1, height: 8, borderRadius: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary" align="center">
                      {order.progress}% Complete
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Stats */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                {orders.length}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                {selectedOrders.size}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Selected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                {Math.round(orders.reduce((acc, order) => acc + order.progress, 0) / orders.length)}%
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Avg Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Order History Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: 320 }, flexShrink: { lg: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 320 },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 320,
                border: 0,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, pt: isMobile ? 8 : 0 }}>
        <Container maxWidth="xl">
          <Box sx={{ p: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300, mb: 1 }}>
              Order History Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Manage your orders with Material Design excellence
            </Typography>
            {mainContent}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OrderHistoryDashboard;