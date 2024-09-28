import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import LineItem from './LineItem';

const InvoiceForm = ({ addInvoice }) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState([{ description: '', rate: '', quantity: '' }]);
  const [errors, setErrors] = useState({});

  const handleAddLineItem = () => {
    setLineItems((prev) => [...prev, { description: '', rate: '', quantity: '' }]);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const formErrors = {};

    if (!clientName) formErrors.clientName = 'Client name is required';
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Email is invalid';
    }

    if (lineItems.length === 0) {
      formErrors.lineItems = 'Please add at least one line item';
    } else {
      lineItems.forEach((item, index) => {
        if (!item.description) formErrors[`description${index}`] = 'Description is required';
        if (!item.rate || item.rate < 0) formErrors[`rate${index}`] = 'Please enter a valid positive rate';
        if (!item.quantity || item.quantity < 0) formErrors[`quantity${index}`] = 'Please enter a valid positive quantity';
      });
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const invoice = {
        id: `${clientName}-${Date.now()}`,
        clientName,
        email,
        notes,
        lineItems,
        status: 'outstanding',
      };
      addInvoice(invoice);
      resetForm();
    }
  };

  const resetForm = () => {
    setClientName('');
    setEmail('');
    setNotes('');
    setLineItems([{ description: '', rate: '', quantity: '' }]);
    setErrors({});
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Create New Invoice</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Client Name"
              fullWidth
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              variant="outlined"
              error={Boolean(errors.clientName)}
              helperText={errors.clientName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Line Items</Typography>
            {lineItems.map((item, index) => (
              <LineItem
                key={index}
                item={item}
                index={index}
                setLineItems={setLineItems}
                errors={errors}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddLineItem}
              sx={{ mt: 2 }}
            >
              Add Line Item
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Create Invoice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default InvoiceForm;
