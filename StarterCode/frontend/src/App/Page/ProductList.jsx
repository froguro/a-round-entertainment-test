import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';



const ProductList = () => {
  console.log('ProductList component is rendering');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('ProductList component mounted');
    fetchProducts();
  }, []); 

  //implement the get products function
  const fetchProducts = async () => {
    console.log('fetchProducts called');
    try {
      const response = await axios.get('http://localhost:5000/api/products'); //only local host
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  };


  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  

  return (
    <Container>
    <Box>
      <Typography variant="h2" component="div" align="center" style={{ fontWeight: 'bold' }} gutterBottom>
        Simple Card List
      </Typography>
    </Box>
      <Grid container spacing={3}>
          {(products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <div style={{ position: 'relative'}}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <IconButton onClick={() => handleDelete(product.id)} 
                  style={{ 
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    color: 'red' }}
                  >
                      <DeleteIcon />
                    </IconButton>
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;