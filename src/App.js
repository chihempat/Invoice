import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InvoiceForm from './Components/InvoiceForm';
import InvoiceList from './Components/InvoiceList';
import InvoiceStore from './InvoiceStore';
import { createInvoice, markInvoiceAsPaid, resetInvoices } from './InvoiceActions';
import { Drawer, Box, Button, Typography, Divider, IconButton, AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Invoice from './Components/Invoice';

const drawerWidth = 240;

const App = () => {
  const [invoices, setInvoices] = useState(InvoiceStore.getInvoices());
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleStoreChange = () => {
      setInvoices([...InvoiceStore.getInvoices()]);
    };
    InvoiceStore.on('change', handleStoreChange);
    return () => InvoiceStore.removeListener('change', handleStoreChange);
  }, []);

  const addInvoice = useCallback((invoice) => {
    createInvoice(invoice);
  }, []);

  const selectInvoice = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    if (isMobile) setMobileOpen(false);
  }, [isMobile]);

  const handleInvoiceUpdated = useCallback((id) => {
    markInvoiceAsPaid(id);
    setSelectedInvoice(InvoiceStore.getInvoices().find((inv) => inv.id === id));
  }, []);

  const handleResetInvoices = useCallback(() => {
    resetInvoices();
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Invoices</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2, width: '100%' }}
          onClick={() => selectInvoice(null)}
        >
          Create New Invoice
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mb: 2, width: '100%' }}
          onClick={handleResetInvoices}
        >
          Reset Invoices
        </Button>
      </Box>
      <Divider />
      <InvoiceList invoices={invoices} onSelectInvoice={selectInvoice} />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Invoice Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: ['56px', '64px'],
        }}
      >
        {selectedInvoice ? (
          <Invoice invoice={selectedInvoice} onInvoiceUpdated={handleInvoiceUpdated}/>
        ) : (
          <InvoiceForm addInvoice={addInvoice} />
        )}
      </Box>
    </Box>
  );
};

export default App;