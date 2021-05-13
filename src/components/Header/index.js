import { Box, IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import StorageKeys from '../../constants/storage-keys';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { cartItemsCountSelector } from '../../features/Cart/selectors'; 
import './style.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration: 'none',
      color: "#fff",

  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color:theme.palette.grey[500],
    zIndex:1
  }
}));
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const history = useHistory();
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.TOKEN);
  }
  const handleCartClick = () => {
    history.push('/cart')
  }


  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.link} to="/">
                EZ SHOP
            </NavLink>
          </Typography>
            <NavLink className={classes.link} to="/products" activeClassName="active-menu">
                <Button color="inherit">Products</Button>
            </NavLink>
            <NavLink className={classes.link} to="/todos" activeClassName="active-menu">
                <Button color="inherit">Todos</Button>
            </NavLink>

            <NavLink className={classes.link} to="/albums">
                <Button color="inherit">Albums </Button>
            </NavLink>

            {!isLoggedIn &&(
              <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            )}
            {isLoggedIn &&(
              <IconButton>
                <AccountCircle color="inherit" onClick={handleUserClick}></AccountCircle>
              </IconButton>
            )}
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal:'right'
        }}
        transformOrigin= {{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        {/* dialog register */}
      <Dialog 
        disableBackdropClick 
        disableEscapeKeyDown 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close/>
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog= {handleClose}/>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog= {handleClose}/>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
