import React from 'react';
import Contents from './Contents.jsx';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>

          <nav>
          <NavLink exact to="/">Home</NavLink>
          {' | '}
          <NavLink to="/issues">Issue List</NavLink>
          {' | '}
          <NavLink to="/report">Report</NavLink>
        </nav>
      </Toolbar>

    </AppBar>
  );
}
export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}