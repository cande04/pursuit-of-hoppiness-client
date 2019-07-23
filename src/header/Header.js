import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1
  }
}))

// const authenticatedOptions = (
//   <React.Fragment>
//     <Link to="/change-password">Change Password</Link>
//     <Link to="/sign-out">Sign Out</Link>
//     <Link to="/beers">See Your Beers</Link>
//     <Link to="/beers-create">Add a Beer</Link>
//     <Link to="/search-beer">Find a Beer</Link>
//   </React.Fragment>
// )
//
// const unauthenticatedOptions = (
//   <React.Fragment>
//     <Link to="/sign-up">Sign Up</Link>
//     <Link to="/sign-in">Sign In</Link>
//   </React.Fragment>
// )
//
// const alwaysOptions = (
//   <React.Fragment>
//     <Link to="/">Home</Link>
//   </React.Fragment>
// )

// const Header = ({ user }) => (
//   <header className="main-header">
//     <h1>Pursuit of Hoppiness</h1>
//     <nav>
//       { user && <span>Welcome, {user.email}</span>}
//       { user ? authenticatedOptions : unauthenticatedOptions }
//       { alwaysOptions }
//     </nav>
//   </header>
// )

const Header = ({ user }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pursuit of Hopiness
          </Typography>
          { user && <span>Welcome, {user.email}</span>}
          { user ? (
            <React.Fragment>
              <Button className={classes.menuButton} component={Link} to="/change-password">Change Password</Button>
              <Button className={classes.menuButton} component={Link} to="/sign-out">Sign Out</Button>
              <Button className={classes.menuButton} component={Link} to="/beers">see beers</Button>
              <Button className={classes.menuButton} component={Link} to="/beers-create">add a beer</Button>
              <Button className={classes.menuButton} component={Link} to="/search-beer">find a beer</Button>
              <Button className={classes.menuButton} component={Link} to="/breweries">see breweries</Button>
              <Button className={classes.menuButton} component={Link} to="/brewery-create">add a brewery</Button>
              <Button className={classes.menuButton} component={Link} to="/search-breweries">search for breweries</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button className={classes.menuButton} component={Link} to="/sign-up">Sign Up</Button>
              <Button className={classes.menuButton} component={Link} to="/sign-in">Sign In</Button>
            </React.Fragment>
          ) }
          { <React.Fragment>
            <Button className={classes.menuButton} component={Link} to="/">Home</Button>
          </React.Fragment> }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
