import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box, Container, Grid, makeStyles, Paper, LinearProgress } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductInfo from '../components/ProductInfo';
import useProductDetail from '../hooks/useProductDetail';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';
import { addToCart } from '../../../features/Cart/cartSlice';

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(3),
    },
    loadingPage: {
        paddingTop:0
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5)
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width:"100%"
    }
}))

function DetailPage(props) {
    const classes = useStyles();
    const {
        params: {productId},
        url
    } = useRouteMatch();
    const { product, loading:loadingProduct } = useProductDetail(productId);
    const dispatch = useDispatch();
    if(loadingProduct) {
        return <Box className={classes.loading}><LinearProgress/></Box>
    } 

    const handleAddToCartSubmit = (formValues) => {
        const action = {};
        console.log('aciton :>> ', action);
        dispatch(action);

    }
    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product}/>
                            <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </Grid>
                    </Grid>
                </Paper>
    
                <ProductMenu/>

                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product}/>
                    </Route>
                    <Route path={`${url}/additional`}>  
                        <ProductAdditional/>
                    </Route>
                    <Route path={`${url}/reviews`}>
                        <ProductReviews/>
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;