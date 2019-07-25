import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'sans-serif'
  },
  list: {
    display: 'flex column',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullList: {
    width: 'auto'
  }
}))

const Header = ({ user }) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [side]: open })
  }

  const beerIcon = require('./beerIcon.png')
  const breweryIcon = require('./breweryIcon.png')
  const userIcon = require('./userIcon.png')

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Typography variant="h4">
          Account Menu
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Beer Options" src={beerIcon} className={classes.bigAvatar} />
        </Grid>
        <ListItem button component={Link} to="/beers">
          <ListItemText primary='See Your Beers'></ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/search-beer">
          <ListItemText primary='Find a Beer'></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Brewery Options" src={breweryIcon} className={classes.bigAvatar} />
        </Grid>
        <ListItem button component={Link} to="/breweries">
          <ListItemText primary='See Your Breweries'></ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/search-breweries">
          <ListItemText primary='Search Breweries by Location'></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="User Options" src={userIcon} className={classes.bigAvatar} />
        </Grid>
        <ListItem button component={Link} to="/change-password">
          <ListItemText primary='Change Password'></ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/sign-out">
          <ListItemText primary='Sign Out'></ListItemText>
        </ListItem>
      </List>
    </div>
  )

  // const fullList = side => (
  //   <div
  //     className={classes.fullList}
  //     role="presentation"
  //     onClick={toggleDrawer(side, false)}
  //     onKeyDown={toggleDrawer(side, false)}
  //   >
  //     <List>
  //       <Button className={classes.menuButton} component={Link} to="/beers">see your beers</Button>
  //       <Button className={classes.menuButton} component={Link} to="/search-beer">find a beer</Button>
  //       <Button className={classes.menuButton} component={Link} to="/breweries">see your breweries</Button>
  //       <Button className={classes.menuButton} component={Link} to="/search-breweries">search for breweries by location</Button>
  //     </List>
  //     <Divider />
  //     <List>
  //       <Button className={classes.menuButton} component={Link} to="/change-password">Change Password</Button>
  //       <Button className={classes.menuButton} component={Link} to="/sign-out">Sign Out</Button>
  //     </List>
  //   </div>
  // )

  if (user) {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#757575' }}>
          <Toolbar>
            <MenuIcon edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)} />
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </Drawer>
            <Typography variant="h6" className={classes.title}>
            Pursuit of Hoppiness
            </Typography>
            { <React.Fragment>
              <Button className={classes.menuButton} component={Link} to="/">Home</Button>
            </React.Fragment> }
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#757575' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Pursuit of Hoppiness
          </Typography>
          <React.Fragment>
            <Button className={classes.menuButton} component={Link} to="/sign-up">Sign Up</Button>
            <Button className={classes.menuButton} component={Link} to="/sign-in">Sign In</Button>
          </React.Fragment>
          { <React.Fragment>
            <Button className={classes.menuButton} component={Link} to="/">Home</Button>
          </React.Fragment> }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
