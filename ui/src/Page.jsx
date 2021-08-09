import React from 'react';
import Contents from './Contents.jsx';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
const NotFound = () => <h1>Page Not Found</h1>;
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  tab: {
    fontWeight: 'Regular',
    fontSize: '13px',
    textTransform: 'none',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#9e9e9e',
      opacity: 0.5,
    },
    '&$selected': {
      color: '#9e9e9e',
      fontWeight: 'Medium',
    },
    '&:focus': {
      color: '#9e9e9e',
    },
  },
}));
function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: '#212121' }}>
        <Tabs
          value={location.pathname}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
        >
          <Tab
            icon={<HomeIcon style={{ fontSize: 'medium' }} />}
            value="/"
            component={Link}
            to="/"
            style={{ minWidth: '5%' }}
            className={classes.tab}
          />
          <Tab
            label="Issue List"
            value="/issues"
            component={Link}
            to="/issues"
            className={classes.tab}
          />
          <Tab
            label="Report"
            value="/report"
            component={Link}
            to="/report"
            className={classes.tab}
          />
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ marginLeft: 'auto', marginRight: '50px' }}
          >
            <MenuIcon style={{ color: '#fff' }} className={classes.tab} />
          </IconButton>
        </Tabs>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
    </div>

    //   <nav>
    //   <NavLink exact to="/">Home</NavLink>
    //   {' | '}
    //   <NavLink to="/issues">Issue List</NavLink>
    //   {' | '}
    //   <NavLink to="/report">Report</NavLink>
    // </nav>
  );
}
function Footer() {
  return (
    <div style={{ paddingBottom: '60px' }}>
      <div
        style={{
          position: 'fixed',
          textAlign: 'center',
          bottom: '0',
          width: '100%',
          height: '40px',
          backgroundColor: '#D8D8F5',
        }}
      >
        <p>
          Made by Gavin Dang 2021{' '}
          <a href="https://github.com/gavindang2911">GitHub repository</a>
        </p>
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Redirect exact from="/" to="/issues" />
          <Route path="/issues" component={IssueList} />
          <Route path="/edit/:id" component={IssueEdit} />
          <Route path="/report" component={IssueReport} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
