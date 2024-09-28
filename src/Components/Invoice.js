import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid2,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Invoice = ({ invoice, onInvoiceUpdated }) => {
  if (!invoice) {
    return <Typography variant="h7">No invoice selected</Typography>;
  }

  const calculateTotal = () => {
    return invoice.lineItems.reduce((total, item) => total + item.rate * item.quantity, 0);
  };

  const sendEmail = () => {
    // Mock function to simulate email sending
    const emailData = {
      to: invoice.email,
      subject: `Invoice #${invoice.id}`,
      body: `
        Invoice Details:
        Client Name: ${invoice.clientName}
        Total Amount: $${calculateTotal().toFixed(2)}
        Notes: ${invoice.notes || 'No notes available.'}

        Line Items:
        ${invoice.lineItems.map(item => `${item.description} - Rate: $${item.rate}, Quantity: ${item.quantity}`).join('\n')}
      `,
    };

    // Simulate sending email
    console.log('Sending email...', emailData);
    alert(`Email sent to ${emailData.to} with subject: ${emailData.subject}`);
  };

  const handleMarkPaid = () => {
    // Call the function to mark the invoice as paid
    if(invoice.status === 'paid') {
      return;
    }
    invoice.status = 'paid'; // Update the status directly in the invoice object
    onInvoiceUpdated(invoice.id); // Notify the parent component about the update
  };

  return (
      <Grid2 sx={{ p: 4, width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Invoice #{invoice.id}
        </Typography>

        {/* Client Details */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Client Details</Typography>
          <Typography variant="body1">{invoice.clientName}</Typography>
          <Typography variant="body2">{invoice.email}</Typography>
        </Paper>

        {/* Line Items */}
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.lineItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">₹{item.rate}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">₹{(item.rate * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {/* Total */}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2} align="right">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{calculateTotal().toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Notes Section */}
        <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Notes</Typography>
          <Typography variant="body1">{invoice.notes || 'No notes available.'}</Typography>
        </Paper>

        {/* Status and Actions */}
        <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="body1">
              Status: <strong>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={sendEmail} endIcon={<SendIcon />}>
              Send Invoice
            </Button>
            <Button variant="outlined" color={invoice.status === 'paid' ? 'success' : "primary"} sx={{ mr: 2 }} onClick={handleMarkPaid}>
              {invoice.status === 'paid' ? 'Paid' : 'Mark as Paid'}
            </Button>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ mt: 4, mb: 2 }} />

        <Typography variant="body2" align="center" color="textSecondary">
          Thank you for your business!
        </Typography>
      </Grid2>
  );
};

export default Invoice;
