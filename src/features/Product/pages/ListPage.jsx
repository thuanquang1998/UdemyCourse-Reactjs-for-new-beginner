import React, { useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';

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
    // state cho việc load product list
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
    const [filters, setFilters] = useState({
        _page: 1, 
        _limit: 12,
        _sort: 'salePrice:ASC',
    })

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


    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange}/>
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