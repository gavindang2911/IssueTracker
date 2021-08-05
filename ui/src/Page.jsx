import React from 'react';
import Contents from './Contents.jsx';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
const NotFound = () => <h1>Page Not Found</h1>;

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';


function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" style={{backgroundColor:"#D8D8F5"}} >
        <Tabs value={location.pathname}  textColor="primary" TabIndicatorProps={{
            style: {
              backgroundColor: "#000"
            }
            }} >
          <Tab  icon={<HomeIcon />} value="/" component={NavLink} to="/" style={{minWidth:"5%"}}/>
          <Tab label="Issue List" value="/issues" component={NavLink} to="/issues" />
          <Tab label="Report" value="/report" component={NavLink} to="/report"
          />
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{marginLeft: 'auto', marginRight:'50px'}}>
          <MenuIcon />
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
      <br></br><br></br><br></br>
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
    <small style={{position: 'absolute', bottom: '0px', display: 'block', width: '100%'}}>
      <p className="text-center">
        Made by Gavin Dang 2021
        {' '}
        <a href="https://github.com/gavindang2911">
          GitHub repository
        </a>
      </p>
    </small>
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