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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HouseIcon from '@mui/icons-material/House';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public';
import { NavLink, useNavigate } from 'react-router-dom';
import SideNavItem from './SideNavItem';

const drawerWidth = 240;

export default function SideNav() {
  const navigate = useNavigate();
  const to = (link) => {
    return () => navigate(link);
  }
  return (
    <>

      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={to('/')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={to('/admin')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
      </List><List>
        <ListItem key={2} disablePadding>
          <ListItemButton onClick={to('/admin/properties')}>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText primary={"Properties"} />

          </ListItemButton>
        </ListItem>
      </List><List>
        <ListItem key={3} disablePadding>
          <ListItemButton onClick={to('/admin/subscriptions')}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Subscriptions"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
      </List>
      <List>
        <ListItem key={4} disablePadding>
          <ListItemButton onClick={to('/admin/transactions')}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={"Transactions"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
