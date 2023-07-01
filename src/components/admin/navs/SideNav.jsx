import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HouseIcon from '@mui/icons-material/House';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

export default function SideNav() {
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem key={1} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={<NavLink to="/admin/properties">Dashboard</NavLink>} />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
            <ListItem key={2} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HouseIcon />
                </ListItemIcon>
                <ListItemText primary={<NavLink to="/admin/properties">Properties</NavLink>} />
                
              </ListItemButton>
            </ListItem>
        </List>
        <List>
            <ListItem key={3} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={<NavLink to="/admin/Subscriptions">Subscriptions</NavLink>} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={4} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={<NavLink to="/admin/users">Users</NavLink>} />
              </ListItemButton>
            </ListItem>
        </List>
        
        <List>
            <ListItem key={4} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={<NavLink to="/admin/properties">Transactions</NavLink>} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>

  );
}