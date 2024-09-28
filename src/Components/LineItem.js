import React from 'react';
import { Grid, TextField } from '@mui/material';

const LineItem = ({ item, index, setLineItems }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setLineItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      return updatedItems;
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={4}>
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={item.description}
          onChange={(e) => handleInputChange(e, index)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Rate"
          fullWidth
          type="number"
          name="rate"
          value={item.rate}
          onChange={(e) => handleInputChange(e, index)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Quantity"
          fullWidth
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={(e) => handleInputChange(e, index)}
        />
      </Grid>
    </Grid>
  );
};

export default LineItem;
