import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Product from './Product';

function ProductList({ data = [] }) {
    return (
        <div>
            <Box>
                <Grid container>
                    {data.map((product)=> (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product = {product}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default ProductList;