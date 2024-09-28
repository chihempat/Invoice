import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import Invoice from './Invoice';

const InvoiceList = ({ invoices, onSelectInvoice }) => {

  const handleClick = (invoice) => {
    onSelectInvoice(invoice);
  };
  return (
     Array.isArray(invoices) && invoices.length > 0 && (<Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Invoices</Typography>

      {invoices.length === 0 ? (
        <Typography>No invoices available</Typography>
      ) : (
        <List>
          {invoices.map((invoice, index) => (
            <Box key={index} sx={{ mb: 2 }} onClick={() => handleClick(invoice)}>
              <ListItem>
                <ListItemText
                  primary={invoice.clientName}
                  secondary={`Status: ${invoice.status}`}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Box>)
  );
};

export default InvoiceList;
