import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string'; 
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer'
ListPage.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {

    },
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    
}))

function ListPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(()=>{
        const params = queryString.parse(location.search);
        //{ isPromotion: "true" }
        return {
            ...params,
            _page: Number.parseInt(queryParams._page) || 1, 
            _limit: Number.parseInt(queryParams._limit) || 9,
            _sort: queryParams._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true' ? true : false,
            isFreeShip: params.isFreeShip === 'true' ? true : false,
        }
    },[location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
   
    const [filters, setFilters] = useState(()=>({
        ...queryParams,
        _page: Number.parseInt(queryParams._page) || 1, 
        _limit: Number.parseInt(queryParams._limit) || 9,
        _sort: queryParams._sort || 'salePrice:ASC',
    }));
    // update filter to url
    useEffect( () => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    },[filters, history])

    useEffect( () => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list', error);
            }
            setLoading(false);
        })();
    }, [filters])

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page:page
        }));
    }

    const handleSortChange = (newSortValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue
        }));  
    }

    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }

    const setNewFilters = (newFilters) => {
        setFilters(newFilters);
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange}/>
                            <FilterViewer filters={filters} onChange={setNewFilters}/>
                            {loading? <ProductSkeletonList length={9}/> : <ProductList data={productList}/>}
                            <Pagination 
                                color="primary" 
                                count={Math.ceil(pagination.total / pagination.limit)} 
                                page={pagination.page}
                                onChange = {handlePageChange}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;